import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get("password");
  const confirmPassword = control.get("confirmPassword");
  if (password?.pristine || confirmPassword?.pristine) return null;
  return password && confirmPassword && password.value !== confirmPassword.value
    ? { misMatch: true }
    : null;
}

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get("password")?.value;
    const confirmPassword = control.get("confirmPassword")?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordDontMatch: true,
      };
    }

    return null;
  };
}
