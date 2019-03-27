import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule, MatButtonModule, MatToolbarModule, MatSnackBarModule} from '@angular/material';
const materialModule = [
  BrowserAnimationsModule,
  MatGridListModule,
  MatButtonModule,
  MatToolbarModule,
  MatSnackBarModule];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialModule
  ],
  exports: [
    materialModule
  ]
})
export class CustomMaterialModule { }
