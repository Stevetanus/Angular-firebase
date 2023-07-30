import { ClickOutsideCloseDirective } from "./directives/clickOutsideClose.directive";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { ReactiveFormsModule } from "@angular/forms";
import { LandingComponent } from "./components/landing/landing.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from "src/environments/environment";
import { provideAuth } from "@angular/fire/auth";
import { getAuth } from "firebase/auth";
import { provideFirebaseApp } from "@angular/fire/app";
import { initializeApp } from "firebase/app";
import { HotToastModule } from "@ngneat/hot-toast";
import { HttpComponent } from "./components/http/http.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ModalComponent } from "./components/modal/modal.component";
import { AuthInterceptorService } from "./auth-interceptor";
import { LoggingInterceptorService } from "./logging-interceptor";
import { AlertComponent } from "./components/alert/alert.component";
import { PlaceholderDirective } from "./directives/placeholder.directive";
import { PostsComponent } from "./components/posts/posts.component";
import { RegistrationFormComponent } from "./components/registration-form/registration-form.component";
import { AlphabetInvasionComponent } from "./pages/alphabet-invasion/alphabet-invasion.component";
import { RxjsComponent } from "./components/rxjs/rxjs.component";
import { CounterComponent } from "./components/counter/counter.component";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    HttpComponent,
    ModalComponent,
    AlertComponent,
    PlaceholderDirective,
    PostsComponent,
    RegistrationFormComponent,
    AlphabetInvasionComponent,
    ClickOutsideCloseDirective,
    RxjsComponent,
    CounterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    HotToastModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
