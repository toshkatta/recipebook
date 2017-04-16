import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DrinkListComponent } from './drinks/components/drink-list.component';
import { PageNotFoundComponent } from './not-found.component';

const appRoutes = [
    { path: "drinks", component: DrinkListComponent },
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }