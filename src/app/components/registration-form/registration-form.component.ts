import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from "@angular/forms";
import { RegistrationService } from "src/app/services/registration.service";
import { PasswordValidator } from "src/app/shared/password.validator";
import { forbiddenNameValidator } from "src/app/shared/user-name-validator";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styles: [],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  get userName() {
    return this.registrationForm.get("userName");
  }

  get email() {
    return this.registrationForm.get("email");
  }

  get alternateEmails() {
    return this.registrationForm.get("alternateEmails") as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(""));
  }

  constructor(
    private fb: FormBuilder,
    private registerS: RegistrationService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        userName: [
          "Steven",
          [
            Validators.required,
            Validators.minLength(3),
            forbiddenNameValidator(/password/),
          ],
        ],
        email: [""],
        subscribe: [false],
        password: [""],
        confirmPassword: [""],
        address: this.fb.group({
          city: [""],
          state: [""],
          postalCode: [""],
        }),
        alternateEmails: this.fb.array([]),
      },
      { validator: PasswordValidator }
    );

    this.registrationForm
      .get("subscribe")
      ?.valueChanges.subscribe((checkedValue) => {
        const email = this.registrationForm.get("email");
        if (checkedValue) {
          email?.setValidators(Validators.required);
        } else {
          email?.clearValidators();
        }
        email?.updateValueAndValidity();
      });
  }

  // registrationForm = new FormGroup({
  //   userName: new FormControl(""),
  //   password: new FormControl(""),
  //   confirmPassword: new FormControl(""),
  //   address: new FormGroup({
  //     city: new FormControl(""),
  //     state: new FormControl(""),
  //     postalCode: new FormControl(""),
  //   }),
  // });

  loadApiData() {
    // this.registrationForm.setValue({
    //   userName: "Bruce",
    //   password: "password",
    //   confirmPassword: "password",
    //   address: {
    //     city: "Miami",
    //     state: "State",
    //     postalCode: "404",
    //   },
    // });
    this.registrationForm.patchValue({
      userName: "Bruce",
      password: "password",
      confirmPassword: "password",
    });
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.registerS.register(this.registrationForm.value).subscribe({
      next: (res) => console.log("Success", res),
      error: (err) => console.log(err),
    });
  }
}
