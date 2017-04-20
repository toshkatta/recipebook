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
    @Input() recipe: Recipe;
    @Input() listId: string;
    @Input() editId: string

    private recipeToDelete: Recipe;

    readonly DELETEID: string = "delete";

    constructor(
        private recipeService: RecipeService,
        private router: Router
    ) { }

    onSelect() {
        this.router.navigate(['/recipe', this.recipe.id]);
    }

    editRecipe() {
        EmitterService.get(this.editId).emit(this.recipe);
    }

    deleteRecipe() {
        EmitterService.get(this.DELETEID).emit(this.recipe);
    }
}