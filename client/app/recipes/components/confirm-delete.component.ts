import { Component, Input } from '@angular/core';

import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { EmitterService } from '../../emitter.service';

@Component({
    selector: 'confirm-delete',
    templateUrl: '../views/confirmDeleteModal.html',
    providers: [RecipeService]
})

export class ConfirmDeleteComponent {
    @Input() deleteId: string;
    @Input() listId: string;

    private recipe: Recipe = new Recipe('', '', '');

    constructor(private recipeService: RecipeService) { }

    deleteRecipe() {
        this.recipeService.removeRecipe(this.recipe.id).subscribe(
            recipes => {
                EmitterService.get(this.listId).emit(recipes);
            },
            err => {
                console.log(err);
            });
    }

    ngOnChanges() {
        // Listen to the 'edit'emitted event so as populate the model
        // with the event payload
        EmitterService.get(this.deleteId).subscribe((recipe: Recipe) => {
            // Copy Object by values
            this.recipe = Object.assign({}, recipe);
        });
    }
}