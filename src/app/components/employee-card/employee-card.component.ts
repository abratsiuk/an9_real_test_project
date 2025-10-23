import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IEmployeeData } from '../../models/iemployee-data.model';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCardComponent {
  @Input() employee: IEmployeeData;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<IEmployeeData>();

  constructor() {}

  onEdit(): void {
    this.edit.emit(this.employee.id);
  }
  onDelete(): void {
    this.delete.emit(this.employee);
  }
}
