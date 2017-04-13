import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { EmitterService } from '../../emitter.service';

@Component({
  selector: 'recipe-box',
  templateUrl: '../views/recipe-box.html',
  providers: [RecipeService, EmitterService]
})

export class RecipeBoxComponent {

  constructor(private recipeService: RecipeService) { }

  @Input() recipe: Recipe;
  @Input() listId: string;
  @Input() editId: string;

  // editRecipe() {
  //   // Emit edit event
  //   EmitterService.get(this.editId).emit(this.recipe);
  // }

  // deleteRecipe(id: string) {
  //   // Call removeComment() from CommentService to delete comment
  //   this.recipeService.removeRecipe(id).subscribe(
  //     recipes => {
  //       // Emit list event
  //       EmitterService.get(this.listId).emit(recipes);
  //     },
  //     err => {
  //       // Log errors if any
  //       console.log(err);
  //     });
  // }
}