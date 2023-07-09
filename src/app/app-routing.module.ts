import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LandingComponent } from "./components/landing/landing.component";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";
import { HttpComponent } from "./components/http/http.component";
import { RegistrationFormComponent } from "./components/registration-form/registration-form.component";

const redirectToLogin = () => redirectUnauthorizedTo(["login"]);
const redirectToHome = () => redirectLoggedInTo(["home"]);

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LandingComponent,
  },
  {
    path: "login",
    pathMatch: "full",
    component: LoginComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: "sign-up",
    pathMatch: "full",
    component: SignUpComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: "home",
    pathMatch: "full",
    component: HomeComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: "http-service",
    pathMatch: "full",
    component: HttpComponent,
  },
  {
    path: "register",
    pathMatch: "full",
    component: RegistrationFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
