import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatDialogModule, MatDividerModule, MatIconModule} from '@angular/material';
import {ConfirmComponent} from './confirm.component';



@NgModule({
  declarations: [
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  exports: [
    ConfirmComponent
  ],
  entryComponents: [
    ConfirmComponent
  ]
})
export class ConfirmModule { }
