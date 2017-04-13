import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { EmitterService } from '../../emitter.service';

@Component({
    selector: 'recipe-list',
    templateUrl: '../views/recipe-list.html',
    providers: [RecipeService]
})

export class RecipeListComponent implements OnInit, OnChanges{
    constructor(private recipeService: RecipeService) { }

    recipes: Recipe[];
    @Input() listId: string;
    @Input() editId: string;

    getRecipes = function () {
        this.recipeService.getRecipes()
        .subscribe(
            data => { this.recipes = data },
            err => console.error("error: ", err),
            () => console.log('Recipes fetched')
        );
    }

    ngOnInit() {
        this.getRecipes();
    }

    ngOnChanges(changes: any) {
        // Listen to the 'list'emitted event so as populate the model
        // with the event payload
        EmitterService.get(this.listId).subscribe((recipes: Recipe[]) => {
            this.getRecipes();
        });
    }
}