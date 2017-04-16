import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeComponent } from './components/index';
import { RecipeDetailComponent } from './components/recipe-detail.component';

const heroesRoutes: Routes = [
  { path: 'recipes', component: RecipeComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RecipeRoutingModule { }
