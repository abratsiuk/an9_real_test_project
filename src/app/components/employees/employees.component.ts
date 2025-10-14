import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from 'postcss';
import { IEmployeeData } from '../../models/iemployee-data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  @Input() employees: IEmployeeData[] = [];
  @Output() delete = new EventEmitter<number>();

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
    this.router.navigate(['employee', 0]);
  }

  onEdit(id: number): void {
    this.router.navigate(['employee', id]);
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }
}
