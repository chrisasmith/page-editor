import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatIconModule,
  MatPaginatorModule, MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {PipesModule} from '../pipes/pipes.module';
import {GridClickDirective} from '../directives/grid-click.directive';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    GridClickDirective
  ],
  providers: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSortModule,
    PipesModule,
    DragDropModule
  ]
})
export class DashboardModule { }
