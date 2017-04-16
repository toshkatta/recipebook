import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DrinkBoxComponent } from './components/drink-box.component';
import { DrinkListComponent } from './components/drink-list.component';


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    DrinkBoxComponent,
    DrinkListComponent
  ],
  exports: [
    DrinkBoxComponent,
    DrinkListComponent
  ]

})
export class DrinkModule {
}