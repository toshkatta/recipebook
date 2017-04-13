import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { RecipeBoxComponent } from './components/recipe-box.component';
import { RecipeListComponent } from './components/recipe-list.component';
import { RecipeFormComponent } from './components/recipe-form.component';
import { RecipeComponent } from './components/index';


import { RecipeService } from './services/recipe.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,

  ],
  declarations: [
    RecipeBoxComponent,
    RecipeFormComponent,
    RecipeListComponent,
    RecipeComponent
  ],

  providers: [
    RecipeService
  ],

  exports: [
    RecipeBoxComponent,
    RecipeFormComponent,
    RecipeListComponent,
    RecipeComponent
  ]

})
export class RecipeModule {
}