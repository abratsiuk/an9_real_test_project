import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, of, Subject } from 'rxjs';
import { IEmployeeRead } from '../../models/iemployee-read.model';
import { IDepartment } from '../../models/idepartment.model';
import { IEmployeeOption } from '../../models/iemployee-option.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';
import { DepartmentsService } from '../../services/departments.service';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { IEmployeeCreate } from '../../models/iemployee-create.model';
import { IEmployeeUpdate } from '../../models/iemployee-update.model';

@Component({
  selector: 'app-page-employee',
  templateUrl: './page-employee.component.html',
  styleUrls: ['./page-employee.component.scss'],
})
export class PageEmployeeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  id = 0;
  mode: 'create' | 'edit' = 'create';
  loading = false;
  employee: IEmployeeRead | null = null;
  departments: IDepartment[] = [];
  managers: IEmployeeOption[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeesService: EmployeesService,
    private departmentsService: DepartmentsService,
  ) {}

  ngOnInit(): void {
    // 1) Read id from route and decide mode
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((p) => +(p.get('id') || '0')),
        switchMap((id) => {
          this.id = id || 0;
          this.mode = this.id ? 'edit' : 'create';

          // 2) Load dropdowns in parallel
          return forkJoin({
            deps: this.departmentsService.getAll().pipe(catchError(() => of([] as IDepartment[]))),
            opts: this.employeesService
              .getOptions()
              .pipe(catchError(() => of([] as IEmployeeOption[]))),
          }).pipe(
            switchMap(({ deps, opts }) => {
              this.departments = deps || [];
              this.managers = opts || [];

              // 3) For edit mode, load employee
              if (!this.id) return of(null);
              return this.employeesService.getEmployee(this.id);
            }),
          );
        }),
      )
      .subscribe((emp) => {
        this.employee = emp;
      });
  }

  //TODO используй только IEmployeeCreate и для обновления тоже
  onEmployeeSave(dto: IEmployeeCreate | IEmployeeUpdate) {
    this.loading = true;

    if (this.mode === 'edit') {
      this.employeesService
        .updateEmployee(this.id, dto as IEmployeeUpdate)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.loading = false;
            alert('Employee updated successfully.');
            this.router.navigate(['/employees']);
          },
          (err) => {
            this.loading = false;
            console.error('updateEmployee error', err);
            alert('Failed to update employee.');
          },
        );
    } else {
      this.employeesService
        .createEmployee(dto as IEmployeeCreate)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (newId) => {
            this.loading = false;
            if (newId) {
              alert('Employee created successfully.');
            } else {
              alert('Employee created (no id returned).');
            }
            this.router.navigate(['/employees']);
          },
          (err) => {
            this.loading = false;
            console.error('createEmployee error', err);
            alert('Failed to create employee.');
          },
        );
    }
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
