import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { errorRoutes } from './layout/error/error.route';

const routes: Routes = [
    {
        path: 'home',
        data: { pageTitle: 'Home' },
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'buildings',
        data: { pageTitle: 'Buildings' },
        loadChildren: () =>
            import('./building/building.module').then((m) => m.BuildingModule),
    },
    {
        path: 'floors',
        data: { pageTitle: 'Floors' },
        loadChildren: () =>
            import('./floor/floor.module').then((m) => m.FloorModule),
    },
    {
        path: 'apartments',
        data: { pageTitle: 'Apartments' },
        loadChildren: () =>
            import('./apartment/apartment.module').then(
                (m) => m.ApartmentModule
            ),
    },
    {
        path: 'parking-floors',
        data: { pageTitle: 'Parking Floors' },
        loadChildren: () =>
            import('./parking-floor/parking-floor.module').then(
                (m) => m.ParkingFloorModule
            ),
    },
    {
        path: 'parking-spots',
        data: { pageTitle: 'Parking Spots' },
        loadChildren: () =>
            import('./parking-spot/parking-spot.module').then(
                (m) => m.ParkingSpotModule
            ),
    },
    {
        path: 'elevators',
        data: { pageTitle: 'Elevators' },
        loadChildren: () =>
            import('./elevator/elevator.module').then((m) => m.ElevatorModule),
    },
    {
        path: 'students',
        data: { pageTitle: 'Students' },
        loadChildren: () =>
            import('./student/student.module').then((m) => m.StudentModule),
    },
    {
        path: 'contracts',
        data: { pageTitle: 'Contracts' },
        loadChildren: () =>
            import('./contract/contract.module').then((m) => m.ContractModule),
    },
    {
        path: 'users',
        data: { pageTitle: 'Users' },
        loadChildren: () =>
            import('./user/user.module').then((m) => m.UserModule),
    },
    {
        path: '',
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
    },
    ...errorRoutes,
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
