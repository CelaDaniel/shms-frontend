import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MainComponent } from './layout/main/main.component';
import { httpInterceptorProviders } from './core/interceptor';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { ErrorComponent } from './layout/error/error.component';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        SidebarComponent,
        ToolbarComponent,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000',
        }),
        AppRoutingModule,
    ],
    providers: [httpInterceptorProviders],
    bootstrap: [AppComponent],
})
export class AppModule {}
