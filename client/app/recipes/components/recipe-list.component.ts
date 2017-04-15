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

export class RecipeListComponent implements OnInit, OnChanges {
    constructor(private recipeService: RecipeService) { }

    recipes: Recipe[];
    page: number = 0;
    more: boolean = false;

    @Input() listId: string;
    @Input() editId: string;

    getRecipes = function (direction: number) {
        switch (direction) {
            case -1:
                if (this.page > 0) {
                    this.page--;
                } else {
                    return;
                }

                break;
            case 0:
                this.page = 0;
                break;
            case 1:
                if (this.more) {
                    this.page++;
                } else {
                    return;
                }


                break;
            default:
                this.page = 0;
                break;
        }

        this.recipeService.getRecipes(this.page)
            .subscribe(
            data => {
                this.recipes = data.recipes;
                this.more = data.more
            },
            err => console.error("error: ", err)
            );
    }

    ngOnInit() {
        this.getRecipes(0);
    }

    ngOnChanges(changes: any) {
        // Listen to the 'list'emitted event so as populate the model
        // with the event payload
        EmitterService.get(this.listId).subscribe((recipes: Recipe[]) => {
            this.getRecipes(0);
        });
    }
}