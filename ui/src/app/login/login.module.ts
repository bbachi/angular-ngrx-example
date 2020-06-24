import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { SignupComponent } from './signup.component';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from './login.component';
import { FooterComponent } from '../footer/footer.component';


@NgModule({
  declarations: [
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
