import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule, MatButtonModule} from '@angular/material';
const materialModule = [
  BrowserAnimationsModule,
  MatGridListModule,
  MatButtonModule];
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
