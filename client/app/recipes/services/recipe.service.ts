import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RecipeService {
    constructor(private http: Http) { };

    getRecipes(page): Observable<{ recipes: Recipe[], more: boolean }> {
        return this.http.get(`api/recipes?page=${page}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getRecipe(id): Observable<Recipe[]> {
        return this.http.get(`api/recipe?id=${id}`)
            .map((res: Response) => res.json().data)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    addRecipe(body: Recipe) {
        if (!body) return

        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers })
        return this.http.post('api/addRecipe', body, options)
            .map(response => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    updateRecipe(body: Recipe): Observable<Recipe[]> {
        if (!body) return

        let bodyString = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put('api/edit', body, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    // Delete a recipe
    removeRecipe(id: number): Observable<Recipe[]> {
        return this.http.delete(`api/delete/${id}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}