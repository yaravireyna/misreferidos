import { Routes, RouterModule } from '@angular/router'

import { SplashComponent } from 'app/components/splash/splash.component'
import { LoginComponent } from 'app/components/login/login.component'
import { InicioComponent } from 'app/components/inicio/inicio.component'

import { AutenticacionGuardService } from 'app/services/referidos/autenticacion-guard.service'


const APP_ROUTES: Routes = [
    { path: '', component: SplashComponent },
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: InicioComponent, canActivate: [ AutenticacionGuardService ] },
    { path: '**', component: SplashComponent }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);