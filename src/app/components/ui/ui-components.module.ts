import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectBoxModule} from './select/select-box/select-box.module';
import {HighlightBoxModule} from './select/highlight-box/highlight-box.module';
import {GridSquareComponent} from './grid-square/grid-square.component';
import {MatCardModule} from '@angular/material';



@NgModule({
  declarations: [
    GridSquareComponent
  ],
  imports: [
    CommonModule,
    SelectBoxModule,
    HighlightBoxModule,
    MatCardModule
  ],
  exports: [
    SelectBoxModule,
    HighlightBoxModule,
    GridSquareComponent,
    MatCardModule
  ]
})
export class UiComponentsModule { }
