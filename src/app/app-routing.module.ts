import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { errorRoutes } from './layout/error/error.route';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () =>
            import('./login/login.module').then((m) => m.LoginModule),
    },
    {
        path: 'forgot-password',
        loadChildren: () =>
            import('./forgot-password/forgot-password.module').then(
                (m) => m.ForgotPasswordModule
            ),
    },
    {
        path: 'reset-password',
        loadChildren: () =>
            import('./reset-password/reset-password.module').then(
                (m) => m.ResetPasswordModule
            ),
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'buildings',
        loadChildren: () =>
            import('./building/building.module').then((m) => m.BuildingModule),
    },
    {
        path: 'floors',
        loadChildren: () =>
            import('./floor/floor.module').then((m) => m.FloorModule),
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    ...errorRoutes,
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
