import { Component } from '@angular/core';

import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'recipe-form',
  templateUrl: '../views/recipe-form.html',
  providers: [RecipeService]
})

export class RecipeFormComponent {
  model: Recipe = {
    name: null,
    ingredients: null,
    directions: null,
    userId: 3
  };
  submitted = false;
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {
    this.getRecipes();
  }

  onSubmit() { this.submitted = true; }

  addRecipe = function () {
    this.model = new Recipe(this.model.name, this.model.ingredients, this.model.directions, this.model.userId);
    this.recipeService.addRecipe(this.model)
      .subscribe(
      data => {
        this.getRecipes();
      },
      err => console.error("error: ", err),
      () => console.log('Recipe added')
      );
  }

  getRecipes = function () {
    this.recipeService.getRecipes()
      .subscribe(
        data => {
          this.recipes = data.data;
        },
        err => console.error("error: ", err),
        () => console.log('Recipes fetched')
      );
  }
}