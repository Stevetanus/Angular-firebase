import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Component } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { HotToastService } from "@ngneat/hot-toast";
import { Router } from "@angular/router";
import { passwordsMatchValidator } from "src/app/shared/password.validator";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styles: [],
})
export class SignUpComponent {
  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router
  ) {}
  signUpForm = new FormGroup(
    {
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );

  get name() {
    return this.signUpForm.get("name");
  }

  get email() {
    return this.signUpForm.get("email");
  }

  get password() {
    return this.signUpForm.get("password");
  }

  get confirmPassword() {
    return this.signUpForm.get("confirmPassword");
  }

  submit() {
    if (!this.signUpForm.valid) return;
    const { name, email, password } = this.signUpForm.value;
    this.authService
      .signUp(name as string, email as string, password as string)
      .pipe(
        this.toast.observe({
          success: "Congrats! You are all signed up!",
          loading: "Signning up......",
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(["/home"]);
        },
      });
  }
}
