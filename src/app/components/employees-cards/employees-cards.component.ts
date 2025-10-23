import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmployeeData } from '../../models/iemployee-data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-cards',
  templateUrl: './employees-cards.component.html',
  styleUrls: ['./employees-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesCardsComponent {
  @Input() employees: IEmployeeData[] = [];
  @Output() deleteEmployee = new EventEmitter<IEmployeeData>();

  constructor(private router: Router) {}

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
