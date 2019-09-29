import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HighlightBoxComponent} from './highlight-box.component';
import {MatButtonModule, MatIconModule} from '@angular/material';



@NgModule({
  declarations: [
    HighlightBoxComponent
  ],
  exports: [
    HighlightBoxComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class HighlightBoxModule { }
