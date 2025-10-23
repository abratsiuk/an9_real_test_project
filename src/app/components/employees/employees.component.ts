import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IEmployeeData } from '../../models/iemployee-data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent implements OnInit {
  @Input() employees: IEmployeeData[] = [];
  @Output() deleteEmployee = new EventEmitter<IEmployeeData>();

  displayedColumns = [
    'firstName',
    'lastName',
    'departmentName',
    'managerFullName',
    'salary',
    'actions',
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCreate(): void {
    this.router.navigate(['employee', 'new']);
  }

  onEdit(id: number): void {
    this.router.navigate(['employee', id]);
  }

  onDelete(employee: IEmployeeData): void {
    this.deleteEmployee.emit(employee);
  }
}
