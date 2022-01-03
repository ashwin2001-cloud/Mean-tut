import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AngularMatModule } from "../angular-material.module";

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    AngularMatModule
  ]
})
export class AuthModule {}
