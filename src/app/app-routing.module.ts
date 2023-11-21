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
        path: 'activate-user',
        loadChildren: () =>
            import('./activate-user/activate-user.module').then(
                (m) => m.ActivateUserModule
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
        path: 'apartments',
        loadChildren: () =>
            import('./apartment/apartment.module').then(
                (m) => m.ApartmentModule
            ),
    },
    {
        path: 'parking-floors',
        loadChildren: () =>
            import('./parking-floor/parking-floor.module').then(
                (m) => m.ParkingFloorModule
            ),
    },
    {
        path: 'parking-spots',
        loadChildren: () =>
            import('./parking-spot/parking-spot.module').then(
                (m) => m.ParkingSpotModule
            ),
    },
    {
        path: 'users',
        loadChildren: () =>
            import('./user/user.module').then((m) => m.UserModule),
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
