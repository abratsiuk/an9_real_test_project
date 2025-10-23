import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { IEmployeeData } from '../../models/iemployee-data.model';
import { Router } from '@angular/router';
import { EmployeesDataSource } from '../../data/employees-data-source';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeesService } from '../../services/employees.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-employees-cards',
  templateUrl: './employees-cards.component.html',
  styleUrls: ['./employees-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesCardsComponent implements AfterViewInit {
  @Output() deleteEmployee = new EventEmitter<IEmployeeData>();
  dataSource = new EmployeesDataSource(this.employeesService);

  defaultSortField = 'lastName';
  defaultSortOrder: 'asc' | 'desc' = 'asc';
  defaultPageSize = 10;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private employeesService: EmployeesService,
  ) {}

  ngAfterViewInit(): void {
    // Первичная загрузка
    // Отложенная первая загрузка — после завершения текущего tick
    Promise.resolve().then(() => {
      this.dataSource.load(0, this.defaultPageSize, this.defaultSortField, this.defaultSortOrder);
      this.changeDetectorRef.markForCheck();
    });

    // Реакция на смену сортировки/страницы
    this.paginator.page.pipe(tap(() => this.loadPage())).subscribe();
  }

  loadPage(): void {
    const sortField = this.defaultSortField;
    const sortOrder = this.defaultSortOrder as 'asc' | 'desc';
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
    this.deleteEmployee.emit(employee);
  }

  trackByEmployeeId(index: number, employee: IEmployeeData): number {
    return employee.id;
  }
}
