import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AngularMaterialModule } from '../angular-material.module';



@NgModule({
  declarations: [LayoutComponent, HomeComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    AngularMaterialModule,
  ]
})
export class LayoutModule { }
