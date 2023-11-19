import { Routes } from "@angular/router";
import { ErrorComponent } from "./error.component";

export const errorRoutes: Routes = [
    {
        path: 'error',
        component: ErrorComponent
    },
    {
        path: '404',
        component: ErrorComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }
]