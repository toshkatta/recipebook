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

export class RecipeFormComponent implements OnChanges{
  @ViewChild('recipeForm') form;

  constructor(private recipeService: RecipeService) {
  }

  private model = new Recipe('', '', '');
  private submitted: boolean = false;
  private editing: boolean = false;

  @Input() editId: string;
  @Input() listId: string;


  onSubmit() { this.submitted = true; }

  addRecipe = function () {
    this.model = new Recipe(this.model.name, this.model.ingredients, this.model.directions);

    this.recipeService.addRecipe(this.model)
      .subscribe(
        data => {
          EmitterService.get(this.listId).emit(data);
          this.model = new Recipe('', '', '');
          this.form.reset();
        },
        err => console.error("error: ", err)
      );
  }

  ngOnChanges() {
    // Listen to the 'edit'emitted event so as populate the model
    // with the event payload
    // EmitterService.get(this.editId).subscribe((recipe: Recipe) => {
    //   this.model = recipe;
    //   this.editing = true;
    // });
  }
}