import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Recipe } from '../models/recipe';

import 'rxjs/add/operator/map'

@Injectable()

export class RecipeService {
    constructor(private http: Http) { };

    addRecipe(recipe: Recipe) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('api/addRecipe', recipe, { headers: headers })
            .map(response => response.json());
    }

    getRecipes() {
        return this.http.get('api/recipes')
            .map(response => response.json());
    }
}