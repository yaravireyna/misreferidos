import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsuarioFirmado } from 'app/interfaces/usuario-firmado';
import { SesionService } from 'app/services/referidos/sesion.service';

@Injectable()
export class AutenticacionGuardService implements CanActivate {
  private usuarioFirmado: UsuarioFirmado;
  constructor(private sesionService: SesionService,
              private router:Router) { 
     this.usuarioFirmado = sesionService.getUsuarioFirmado();
  }

  canActivate(){
      if(this.usuarioFirmado && this.usuarioFirmado.token){
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }

}
