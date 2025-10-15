import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { EmployeesService } from '../../services/employees.service';
import { IEmployeeData } from '../../models/iemployee-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-page-employees',
  templateUrl: './page-employees.component.html',
  styleUrls: ['./page-employees.component.scss'],
})
export class PageEmployeesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  employees: IEmployeeData[] | null = null;

  constructor(private employeesService: EmployeesService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.reload();
  }
  reload(): void {
    this.employeesService
      .loadEmployeesData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.employees = data;
      });
  }

  onDelete(id: number): void {
    // TODO ask before delete
    this.employeesService
      .deleteEmployee(id)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          if (err?.status === 409) {
            this.snack.open('This employee is a manager and cannot be deleted.', 'OK', {
              duration: 3000,
            });
          } else {
            console.error('deleteEmployee error', err);
            this.snack.open('Delete failed. Please try again.', 'Dismiss', { duration: 4000 });
          }
          return of(undefined);
        }),
      )
      .subscribe(() => this.reload());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
