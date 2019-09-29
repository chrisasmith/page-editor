import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {MatBottomSheetModule, MatButtonModule, MatCardModule, MatIconModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {PipesModule} from '../pipes/pipes.module';
import {GridClickDirective} from '../directives/grid-click.directive';



@NgModule({
  declarations: [
    DashboardComponent,
    GridClickDirective
  ],
  providers: [
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    PipesModule
  ]
})
export class DashboardModule { }
