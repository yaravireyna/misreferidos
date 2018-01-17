import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { ReferidosService } from 'app/services/referidos/referidos.service';
import { SesionService } from 'app/services/referidos/sesion.service';

import { Usuario } from 'app/interfaces/usuario'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public forma:FormGroup;
  private usuario: Usuario;
  public isLogin: boolean = false;  
  public urlFondo: string = "url('assets/img/login_image.jpg')"

  constructor(private referidosService: ReferidosService,
              private sesionService: SesionService,
              private router: Router,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
      let datosTelefono = this.sesionService.getDatosTelefono();
      this.sesionService.limpiaDatos();
      
      this.forma = new FormGroup({
          'usuario': new FormControl(datosTelefono.usuario ,  [
                                          Validators.required
                                        ]),
          'password': new FormControl('' , [
                                          Validators.required
                                        ]),
          'imei': new FormControl(datosTelefono.imei)
      });
  }

  public login() {
      if (! this.forma.valid) {
          return;
      }

      this.usuario = this.forma.value;
        
      this.isLogin = true;
      this.referidosService.login(this.usuario)
                    .subscribe(res => {
                        this.isLogin = false;
                        if (res.exitoso) {
                            this.sesionService.agregarUsuario(res);
                            this.router.navigate(['/inicio']);
                        } else {
                            this.muestraAlerta();
                        }
                    },
                    error => {
                        this.isLogin = false;
                        this.muestraAlerta();
                    });
  }

  private muestraAlerta() {
        this.snackBar.open("Datos incorrectos. Intenta de nuevo.", undefined, {
            duration: 4000,
            extraClasses: ['success-snackbar']
        });
  }
}
