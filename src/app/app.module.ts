import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { DataResultComponent } from './results/data-result/data-result.component';

import { ResultService } from './results/result.service'

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultsComponent,
    DataResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ResultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
