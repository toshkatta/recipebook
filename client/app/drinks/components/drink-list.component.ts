import { Component, OnInit } from '@angular/core';

import { Drink } from '../models/drink';

import { DrinkService } from '../services/drink.service';

@Component({
    selector: 'drink-list',
    templateUrl: '../views/drink-list.html'
})

export class DrinkListComponent implements OnInit {
    private drinks: Drink[];
    private previousSortProperty: string = '';
    private searchValue: string = null;
    private sortAsc: boolean = true;

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

    sort(property: string) {
        if (property === this.previousSortProperty) {
            this.sortAsc = !this.sortAsc;
        }

        this.previousSortProperty = property;

        let propertyType = typeof this.drinks[0][property];
        if (propertyType === 'number') {
            this.drinks.sort((a, b) => {
                return this.sortAsc ? a[property] - b[property] : b[property] - a[property]
            })
        } else if (propertyType === 'string') {
            this.drinks.sort((a, b) => {
                if (a[property].toLowerCase() < b[property].toLowerCase()) {
                    return this.sortAsc ? -1 : 1;
                } else if (a[property].toLowerCase() > b[property].toLowerCase()) {
                    return this.sortAsc ? 1 : -1;
                } else {
                    return 0;
                }
            })
        }


    }
}