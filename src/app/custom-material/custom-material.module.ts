import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
const materialModule = [ BrowserAnimationsModule,
  MatGridListModule];
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
