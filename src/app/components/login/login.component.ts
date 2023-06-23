import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [".sign-up-link { font-size: 1.2rem; margin-left: 8px}"],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  submit() {
    if (!this.loginForm.valid) return;

    const { email, password } = this.loginForm.value;

    this.authService
      .login(email as string, password as string)
      .pipe(
        this.toast.observe({
          success: "Logged in successfully!",
          loading: "Logging in......",
          error: "There was an error!",
        })
      )
      .subscribe({
        next: (res) => {
          this.router.navigate(["/home"]);
        },
      });
  }
}
