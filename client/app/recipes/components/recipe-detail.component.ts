import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'recipe-detail',
    templateUrl: '../views/recipe-detail.html',
    providers: [RecipeService]
})

export class RecipeDetailComponent {
    private recipe: Recipe;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: RecipeService
    ) {
        this.recipe = new Recipe('', '', '');
    }

    ngOnInit() {
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.service.getRecipe(+params['id']))
            .subscribe((data) => {
                this.recipe = data[0];
            });
    }


}