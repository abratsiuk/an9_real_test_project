import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEmployeeData } from '../../models/iemployee-data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-cards',
  templateUrl: './employees-cards.component.html',
  styleUrls: ['./employees-cards.component.scss'],
})
export class EmployeesCardsComponent implements OnInit {
  @Input() employees: IEmployeeData[] = [];
  @Output() delete = new EventEmitter<IEmployeeData>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCreate(): void {
    this.router.navigate(['employee', 'new']);
  }

  onEdit(id: number): void {
    this.router.navigate(['employee', id]);
  }

  onDelete(employee: IEmployeeData): void {
    this.delete.emit(employee);
  }
}
