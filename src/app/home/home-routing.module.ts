import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { UserRouteAccessService } from '../core/auth/user-route-access.service';

const routes: Routes = [
    {
        path: '',
        data: { roles: [] },
        component: HomeComponent,
        canActivate: [UserRouteAccessService],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
