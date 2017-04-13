import { Component } from '@angular/core';
import { EmitterService } from './emitter.service'


@Component({
  selector: 'app',
  templateUrl: '../views/main.html'
})

export class AppComponent {
  private listId = 'COMMENT_COMPONENT_LIST';
  private editId = 'COMMENT_COMPONENT_EDIT';
  constructor() { }
}