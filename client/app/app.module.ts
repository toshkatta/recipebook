import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { RecipeModule } from './recipes/recipe.module';
import { DrinkModule } from './drinks/drinks.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { EmitterService } from './emitter.service';

import { PageNotFoundComponent } from './not-found.component'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    JsonpModule,
    RecipeModule,
    DrinkModule,
    AppRoutingModule
  ],
  declarations: [AppComponent, PageNotFoundComponent],
  providers: [EmitterService],
  bootstrap: [AppComponent]
})

export class AppModule { }