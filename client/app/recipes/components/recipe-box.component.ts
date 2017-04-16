import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { EmitterService } from '../../emitter.service';

import { Router } from '@angular/router';

@Component({
  selector: 'recipe-box',
  templateUrl: '../views/recipe-box.html',
  providers: [RecipeService, EmitterService]
})

export class RecipeBoxComponent {
  private confirmDelete: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) { }

  @Input() recipe: Recipe;
  @Input() listId: string;
  @Input() editId: string;

  onSelect() {
    this.router.navigate(['/recipe', this.recipe.id]);
  }

  editRecipe() {
    // Emit edit event
    EmitterService.get(this.editId).emit(this.recipe);
  }

  deleteRecipe() {
    this.recipeService.removeRecipe(this.recipe.id).subscribe(
      recipes => {
        // Emit list event
        EmitterService.get(this.listId).emit(recipes);
      },
      err => {
        // Log errors if any
        console.log(err);
      });
  }
}