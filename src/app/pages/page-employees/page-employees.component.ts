import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeesService } from '../../services/employees.service';
import { IEmployeeData } from '../../models/iemployee-data.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-page-employees',
  templateUrl: './page-employees.component.html',
  styleUrls: ['./page-employees.component.scss'],
})
export class PageEmployeesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  employees: IEmployeeData[] | null = null;

  constructor(
    private employeesService: EmployeesService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
  ) {}

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
          this.reload();
        },
        (err) => {
          this.snack.open('Delete failed. Please try again.', 'Dismiss', {
            duration: 4000,
          });
        },
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
