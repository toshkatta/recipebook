import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { RecipeFormComponent } from './components/recipe-form.component';

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule],
  declarations: [AppComponent, RecipeFormComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }