import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LeftnavComponent } from './leftnav/leftnav.component';



@NgModule({
  declarations: [HeaderComponent, LeftnavComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    LeftnavComponent
  ]
})
export class SharedModule { }
