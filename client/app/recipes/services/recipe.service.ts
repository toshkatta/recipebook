import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RecipeService {
    constructor(private http: Http) { };

    getRecipes(): Observable<Recipe[]> {
        return this.http.get('api/recipes')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    addRecipe(body: Object) {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers })
        return this.http.post('api/addRecipe', body, options)
            .map(response => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}