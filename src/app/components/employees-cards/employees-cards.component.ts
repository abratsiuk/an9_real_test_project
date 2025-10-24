import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Output,
    ViewChild,
} from '@angular/core';
import {IEmployeeData} from '../../models/iemployee-data.model';
import {Router} from '@angular/router';
import {EmployeesDataSource} from '../../data/employees-data-source';
import {MatPaginator} from '@angular/material/paginator';
import {EmployeesService} from '../../services/employees.service';
import {tap} from 'rxjs/operators';
import {ISortedField} from '../../models/isorted-field.model';
import {ISort} from '../../models/isort.model';

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
  defaultPageSize = 12;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  sortFields: ISortedField[] = [
    { fieldCode: 'firstName', fieldName: 'First name' },
    { fieldCode: 'lastName', fieldName: 'Last name' },
    { fieldCode: 'departmentName', fieldName: 'Department' },
    { fieldCode: 'managerFullName', fieldName: 'Manager' },
    { fieldCode: 'salary', fieldName: 'Salary' },
  ];
  currentSortField = this.defaultSortField;
  currentSortOrder: 'asc' | 'desc' = this.defaultSortOrder;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private employeesService: EmployeesService,
  ) {}

  ngAfterViewInit(): void {
    // Первичная загрузка
    // Отложенная первая загрузка — после завершения текущего tick
    Promise.resolve().then(() => {
      this.dataSource.load(0, this.defaultPageSize, this.currentSortField, this.currentSortOrder);
      this.changeDetectorRef.markForCheck();
    });

    // Реакция на смену сортировки/страницы
    this.paginator.page.pipe(tap(() => this.loadPage())).subscribe();
  }

  loadPage(): void {
    this.dataSource.load(
      this.paginator.pageIndex,
      this.paginator.pageSize || this.defaultPageSize,
      this.currentSortField,
      this.currentSortOrder,
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

  // прилетает из <app-sort-control (sortChange)="onSortChange($event)">
  onSortChange(sort: ISort) {
    // сохраняем выбранную сортировку
    this.currentSortField = sort.sortField;
    this.currentSortOrder = sort.sortOrder;

    // сбрасываем на первую страницу при смене сортировки
    this.paginator.pageIndex = 0;

    // грузим заново
    this.loadPage();
  }
}
