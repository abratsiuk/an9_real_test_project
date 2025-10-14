import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Input } from 'postcss';
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
        id: [0], // hidden technical control for validation only
        firstName: ['', [Validators.required, Validators.maxLength(100)]],
        lastName: ['', [Validators.required, Validators.maxLength(100)]],
        salary: [0, [Validators.required, Validators.min(0)]],
        departmentId: [null, [Validators.required]],
        managerId: [null], // optional
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

    // TODO use mode 'create' | 'edit' if needed
    // const mode = v.id ? 'edit' : 'create';

    // Build payload without 'id'
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
    // TODO go tp the list
  }
  getFirstErrorMessage(field: string) {
    const c = this.form.get(field);
    if (!c || !c.errors || !c.touched) { return null; }

    const map: Record<string, string> = {
      firstName: 'First name',
      lastName: 'Last name',
      salary: 'Salary',
      departmentId: 'Department',
      managerId: 'Manager',
    };

    const e: any = c.errors;
    if (e.required) { return `${map[field]} is required.`; }
    if (e.min) { return `${map[field]} must be ≥ ${e.min.min}.`; }
    if (e.max) { return `${map[field]} must be ≤ ${e.max.max}.`; }
    if (e.maxlength) { return `Maximum length is ${e.maxlength.requiredLength}.`; }

    // Group-level custom errors surfaced at form-level:
    if (field === 'managerId' && this.form.errors?.selfManager) {
      return `Employee cannot be his own manager.`;
    }
    return 'Invalid value.';
  }

  /** Useful for disabling current employee in managers list (UI hint). */
  isSelf(optionId: number): boolean {
    const id = this.form.get('id')?.value as number | null;
    return !!id && id === optionId;
  }
}
