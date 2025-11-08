import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild,} from '@angular/core';
import {IEmployeeData} from '../../models/iemployee-data.model';
import {Router} from '@angular/router';
import {EmployeesDataSource} from '../../data/employees-data-source';
import {EmployeesService} from '../../services/employees.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent implements AfterViewInit {
  // @Output() deleteEmployee = new EventEmitter<IEmployeeData>();
  private destroy$ = new Subject<void>();

  displayedColumns = [
    'firstName',
    'lastName',
    'departmentName',
    'managerFullName',
    'salary',
    'actions',
  ];
  dataSource = new EmployeesDataSource(this.employeesService);

  defaultSortField = 'lastName';
  defaultSortOrder: 'asc' | 'desc' = 'asc';
  defaultPageSize = 10;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private employeesService: EmployeesService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngAfterViewInit(): void {
    // Первичная загрузка
    // Отложенная первая загрузка — после завершения текущего tick
    Promise.resolve().then(() => {
      this.dataSource.load(0, this.defaultPageSize, this.defaultSortField, this.defaultSortOrder);
      this.changeDetectorRef.markForCheck();
    });

    // Реакция на смену сортировки/страницы
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadPage()))
      .subscribe();

    // Сброс страницы при смене сортировки
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  loadPage(): void {
    const sortField = this.sort.active || this.defaultSortField;
    const sortOrder = (this.sort.direction || this.defaultSortOrder) as 'asc' | 'desc';
    this.dataSource.load(
      this.paginator.pageIndex,
      this.paginator.pageSize || this.defaultPageSize,
      sortField,
      sortOrder,
    );
  }

  onCreate(): void {
    this.router.navigate(['employee', 'new']);
  }

  onEdit(id: number): void {
    this.router.navigate(['employee', id]);
  }

  onDelete(employee: IEmployeeData): void {
    this.employeesService
      .canDelete(employee.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (!result.canDelete) {
          this.snack.open(result.reason || 'Cannot delete employee.', 'Dismiss', {
            duration: 3000,
          });
          return;
        }

        this.openDeleteConfirmationDialog(employee);
      });
  }
  private openDeleteConfirmationDialog(employee: IEmployeeData): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '25rem',
      data: {
        title: 'Delete Employee',
        message:
          `Are you sure you want to delete ` +
          ` <b>${employee.firstName} ${employee.lastName}</b> (${employee.departmentName}) ?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteEmployee(employee.id);
      }
    });
  }
  private deleteEmployee(id: number): void {
    this.employeesService
      .deleteEmployee(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.snack.open('Employee deleted successfully.', 'OK', {
            duration: 3000,
          });
          this.loadPage();
        },
        (err) => {
          this.snack.open('Delete failed. Please try again.', 'Dismiss', {
            duration: 4000,
          });
        },
      );
  }
}
