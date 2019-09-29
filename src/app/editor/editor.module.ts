import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import {PanelsModule} from './panels/panels.module';
import {LibraryModule} from '../components/library/library.module';
import {EditorService} from './editor.service';
import {UiComponentsModule} from '../components/ui/ui-components.module';
import {LibraryService} from './panels/library/library.service';
import {MatButtonModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {PipesModule} from '../pipes/pipes.module';



@NgModule({
  declarations: [
    EditorComponent
    ],
  imports: [
    CommonModule,
    PipesModule,
    UiComponentsModule,
    PanelsModule,
    LibraryModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
  ],
  providers: [
    EditorService,
    LibraryService
  ]
})
export class EditorModule { }
