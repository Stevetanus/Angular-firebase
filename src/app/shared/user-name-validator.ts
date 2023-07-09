import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// export function forbiddenNameValidator(
//   control: AbstractControl
// ): ValidationErrors | null {
//   const forbidden = /admin/.test(control.value);
//   return forbidden ? { forbiddenName: { value: control.value } } : null;
// }

export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = forbiddenName.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
