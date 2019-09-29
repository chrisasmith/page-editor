import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {UiComponentsModule} from './components/ui/ui-components.module';
import {EditorModule} from './editor/editor.module';
import {MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    DashboardModule,
    UiComponentsModule,
    EditorModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
