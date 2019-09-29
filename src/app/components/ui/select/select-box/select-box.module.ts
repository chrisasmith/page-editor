import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectBoxComponent } from './select-box.component';
import {SelectActionsComponent} from './select-actions/select-actions.component';
import {MatIconModule, MatTooltipModule} from '@angular/material';



@NgModule({
  declarations: [
    SelectActionsComponent,
    SelectBoxComponent
  ],
  exports: [
    SelectBoxComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
  ]
})
export class SelectBoxModule { }
