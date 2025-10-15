import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IEmployeeRead } from '../../models/iemployee-read.model';
import { IDepartment } from '../../models/idepartment.model';
import { IEmployeeOption } from '../../models/iemployee-option.model';
import { IEmployeeCreate } from '../../models/iemployee-create.model';
import { IEmployeeUpdate } from '../../models/iemployee-update.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from '../../app-validators';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
})
export class EmployeeEditComponent implements OnInit, OnChanges {
  @Input() employee: IEmployeeRead | null = null;
  @Input() departments: IDepartment[] = [];
  @Input() managers: IEmployeeOption[] = [];
  @Output() employeeSave = new EventEmitter<IEmployeeCreate | IEmployeeUpdate>();
  @Output() cancel = new EventEmitter<void>();
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        id: [0],
        firstName: ['', [Validators.required, Validators.maxLength(100)]],
        lastName: ['', [Validators.required, Validators.maxLength(100)]],
        salary: [null, [Validators.required, Validators.min(0), Validators.max(100000)]],
        departmentId: [null, [Validators.required]],
        managerId: [null],
      },
      { validators: [AppValidators.selfManager] },
    );

    if (this.employee) {
      this.form.patchValue(this.employee);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.employee && this.form && this.employee) {
      this.form.patchValue(this.employee);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;

    const payload: IEmployeeCreate | IEmployeeUpdate = {
      firstName: v.firstName,
      lastName: v.lastName,
      salary: v.salary,
      departmentId: v.departmentId,
      managerId: v.managerId ?? null,
    };

    this.employeeSave.emit(payload);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  getFirstErrorMessage(field: string) {
    const control = this.form.get(field);
    if (!control || !control.errors || !control.touched) {
      return null;
    }
    const fieldName = {
      firstName: 'First name',
      lastName: 'Last name',
      salary: 'Salary',
      departmentId: 'Department',
      managerId: 'Manager',
    };

    const required = control.getError('required');
    const maxlength = control.getError('maxlength');
    const min = control.getError('min');
    const max = control.getError('max');

    if (required) {
      return `${fieldName[field]} is required.`;
    }
    if (maxlength) {
      return `Maximum length is ${maxlength.requiredLength} characters.`;
    }
    if (min) {
      return `${fieldName[field]} must be greater or equal than ${min.min}.`;
    }
    if (max) {
      return `${fieldName[field]} must be lesser or equal than ${max.max}.`;
    }

    if (field === 'managerId' && this.form.errors?.selfManager) {
      return `Employee cannot be his own manager.`;
    }
    return null;
  }

  /** Useful for disabling current employee in managers list (UI hint). */
  isSelf(optionId: number): boolean {
    const id = this.form.get('id')?.value as number | null;
    return !!id && id === optionId;
  }
}
