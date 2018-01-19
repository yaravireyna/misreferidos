//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
,
//Terceros
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
,
//Rutas
import { APP_ROUTING }  from './app.routes'

//Referidos Component
import { AppComponent } from './app.component';
import { SplashComponent } from './components/splash/splash.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DialogNuevoReferidoComponent } from './components/dialog-nuevo-referido/dialog-nuevo-referido.component';
,import { MisReferidosComponent } from './components/mis-referidos/mis-referidos.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { MiProgresoComponent } from './components/mi-progreso/mi-progreso.component';
import { DialogDetalleReferidoComponent } from './components/dialog-detalle-referido/dialog-detalle-referido.component';
import { MatSelectModule } from '@angular/material/select';
import { DialogBasesComponent } from './components/dialog-bases/dialog-bases.component';
import { DialogDetallePromocionComponent } from './components/dialog-detalle-promocion/dialog-detalle-promocion.component';
import { DialogDetalleSucursalComponent } from './components/dialog-detalle-sucursal/dialog-detalle-sucursal.component';
import { TogleButtonComponent } from './components/togle-button/togle-button.component';

//Referidos Services
import { ReferidosService } from './services/referidos/referidos.service';
import { SesionService } from './services/referidos/sesion.service';
import { AutenticacionGuardService } from './services/referidos/autenticacion-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    LoginComponent,
    InicioComponent,
    DialogNuevoReferidoComponent,
    MisReferidosComponent,
    ConfirmacionComponent,
    MiProgresoComponent,
    DialogDetalleReferidoComponent,
    DialogBasesComponent,
    DialogDetallePromocionComponent,
    DialogDetalleSucursalComponent,  
    TogleButtonComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    NoopAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [ 
               ReferidosService,
               SesionService,
               AutenticacionGuardService
             ],
  bootstrap: [AppComponent],
  entryComponents: [
                    DialogNuevoReferidoComponent,
                    DialogDetalleReferidoComponent,
                    DialogBasesComponent,
                    DialogDetallePromocionComponent,
                    DialogDetalleSucursalComponent
                   ]
})
export class AppModule { }
