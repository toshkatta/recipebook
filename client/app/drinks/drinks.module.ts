import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DrinkBoxComponent } from './components/drink-box.component';
import { DrinkListComponent } from './components/drink-list.component';

import { NameFilterPipe } from './filters/name-filter.pipe'

import { DrinkService } from './services/drink.service'


@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        NameFilterPipe,
        DrinkBoxComponent,
        DrinkListComponent
    ],
    providers: [
        DrinkService
    ],
    exports: [
        DrinkBoxComponent,
        DrinkListComponent
    ]

})
export class DrinkModule {
}