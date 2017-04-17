import { Component, OnInit } from '@angular/core';

import { Drink } from '../models/drink';

import { DrinkService } from '../services/drink.service';

@Component({
  selector: 'drink-list',
  templateUrl: '../views/drink-list.html'
})

export class DrinkListComponent implements OnInit {
  private drinks: Drink[];

  constructor(private service: DrinkService) { }

  ngOnInit() {
    this.service.getDrinks()
      .subscribe(
      data => {
        this.drinks = data;
      },
      err => console.error("error: ", err)
      );
  }
}