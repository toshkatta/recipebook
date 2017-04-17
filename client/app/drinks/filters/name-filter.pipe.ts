import { Pipe, PipeTransform } from '@angular/core';
import { Drink } from '../models/drink';

@Pipe({
    name: 'nameFilter',
    pure: false
})
export class NameFilterPipe implements PipeTransform {
    transform(items: Drink[], searchValue: string): any {
        if (!items || !searchValue) {
            return items
        }

        return items.filter(item => {
            return item.name.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1 ||
                    item.ingredients.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1 ||
                    item.directions.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1
        });
    }
}