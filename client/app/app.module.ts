import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { RecipeModule } from './recipes/recipe.module';

import { AppComponent } from './app.component';
import { EmitterService } from './emitter.service';

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, JsonpModule, RecipeModule],
  declarations: [AppComponent],
  providers: [EmitterService],
  bootstrap: [AppComponent]
})

export class AppModule { }