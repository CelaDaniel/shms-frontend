import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
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
