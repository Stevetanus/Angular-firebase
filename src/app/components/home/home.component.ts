import { Component } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent {
  constructor(private authService: AuthenticationService) {}

  user$ = this.authService.currentUser$;
}
