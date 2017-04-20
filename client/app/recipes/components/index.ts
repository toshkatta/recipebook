import { Component } from '@angular/core';
import { EmitterService } from '../../emitter.service';

@Component({
    selector: 'recipe-widget',
    templateUrl: '../views/recipe-widget.html',
})
export class RecipeComponent {
    // Event tracking properties
    private listId = 'list';
    private editId = 'edit';
}