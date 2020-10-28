import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatPaginatorModule } from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule
  ],
  exports: [
    MatCardModule,
    MatPaginatorModule
  ]
})
export class AngularMaterialModule { }
