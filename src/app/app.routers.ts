import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [

    //Using children
    { path: '', redirectTo: 'home/list', pathMatch: 'prefix' },
    {
        path: 'home', component: HomeComponent, children: [
            { path: 'list', component: ListComponent },
            { path: 'form', component: FormComponent },
            { path: 'details', component: DetailsComponent },
            { path: 'table', component: TableComponent }
        ]
    },

    /*
    //Using outlet 
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: AppComponent },
    { path: 'list', component: ListComponent, outlet: "left" },
    { path: 'form', component: FormComponent, outlet: "left" },
    { path: 'table', component: TableComponent, outlet: "left" } */

    /* // otherwise redirect to home 
    { path: '**', redirectTo: '' } 
    */
]