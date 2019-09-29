import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library/library.component';
import { PropertyComponent } from './property/property.component';
import {UiComponentsModule} from '../../components/ui/ui-components.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatSliderModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    LibraryComponent,
    PropertyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    UiComponentsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatExpansionModule
  ],
  exports: [
    LibraryComponent,
    PropertyComponent,
    DragDropModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatExpansionModule
  ]
})
export class PanelsModule { }
