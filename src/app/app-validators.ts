import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AppValidators {
  static selfManager: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const id = group.get('id')?.value as number | null;
    const managerId = group.get('managerId')?.value as number | null;

    if (!id || !managerId) {
      return null;
    }
    return id === managerId ? { selfManager: true } : null;
  }
}
