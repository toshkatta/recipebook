import { Component, EventEmitter, Input, OnChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { RecipeBoxComponent } from './recipe-box.component';
import { RecipeService } from '../services/recipe.service';
import { EmitterService } from '../../emitter.service';
import { Recipe } from '../models/recipe';


@Component({
  selector: 'recipe-form',
  templateUrl: '../views/recipe-form.html',
  providers: [RecipeService]
})

export class RecipeFormComponent implements OnChanges {
  @ViewChild('recipeForm') form;

  constructor(private recipeService: RecipeService) {
  }

  private model = new Recipe('', '', '');
  private submitted: boolean = false;
  private editing: boolean = false;

  @Input() editId: string;
  @Input() listId: string;


  onSubmit() { this.submitted = true; }

  resetForm = function () {
    this.model = new Recipe('', '', '');
    this.form.reset();
    this.removeEditing();
  }

  checkIfEmpty(body: Recipe, edit = false): Recipe {
    body.name = body.name ? body.name.trim() : null;
    body.ingredients = body.ingredients ? body.ingredients.trim() : null;
    body.directions = body.directions ? body.directions.trim() : null;

    if (!body.name || !body.directions || !body.ingredients) return null

    if (edit) {
      if (!body.id) {
        return null
      } else {
        return {
          id: body.id,
          name: body.name,
          ingredients: body.ingredients,
          directions: body.directions
        };

      }
    } else {
      return {
        name: body.name,
        ingredients: body.ingredients,
        directions: body.directions
      };
    }

  }

  removeEditing = function () {
    this.editing = false;
  }

  addRecipe = function () {
    if (!this.checkIfEmpty(this.model)) return

    this.model = new Recipe(this.model.name, this.model.ingredients, this.model.directions);

    this.recipeService.addRecipe(this.model)
      .subscribe(
      data => {
        EmitterService.get(this.listId).emit(data);
        this.resetForm();
      },
      err => console.error("error: ", err)
      );
  }

  editRecipe = function () {
    if (!this.checkIfEmpty(this.model, true)) return

    this.recipeService.updateRecipe(this.model)
      .subscribe(
      data => {
        EmitterService.get(this.listId).emit(data);
        this.resetForm();
      },
      err => console.error("error: ", err)
      );
  }

  ngOnChanges() {
    // Listen to the 'edit'emitted event so as populate the model
    // with the event payload
    EmitterService.get(this.editId).subscribe((recipe: Recipe) => {
      // Copy Object by values
      this.model = Object.assign({}, recipe);
      this.editing = true;
    });
  }
}