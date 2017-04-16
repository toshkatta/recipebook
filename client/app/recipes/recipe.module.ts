import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { RecipeBoxComponent } from './components/recipe-box.component';
import { RecipeListComponent } from './components/recipe-list.component';
import { RecipeFormComponent } from './components/recipe-form.component';
import { RecipeDetailComponent } from './components/recipe-detail.component';
import { RecipeComponent } from './components/index';

import { RecipeService } from './services/recipe.service';

import { RecipeRoutingModule } from './recipe-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RecipeRoutingModule
  ],
  declarations: [
    RecipeComponent,
    RecipeBoxComponent,
    RecipeFormComponent,
    RecipeListComponent,
    RecipeDetailComponent
  ],

  providers: [
    RecipeService
  ],

  exports: [
    RecipeComponent,
    RecipeBoxComponent,
    RecipeFormComponent,
    RecipeListComponent,
    RecipeDetailComponent
  ]

})

export class RecipeModule {
}