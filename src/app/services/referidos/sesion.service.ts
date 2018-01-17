import { Injectable } from '@angular/core';
import { UsuarioFirmado } from 'app/interfaces/usuario-firmado'

@Injectable()
export class SesionService {

    constructor() {

    }

    public agregarUsuario(datosUsuario:any) {
        let usuarioFirmado: UsuarioFirmado = {
              nombre: datosUsuario.datos.content,
              numReferidosTotal: datosUsuario.datos.ranking,
              numReferidosAprobados: datosUsuario.datos.clientes,
              token: datosUsuario.token
        };
        
        sessionStorage.clear();
        sessionStorage.setItem('usuarioFirmado', JSON.stringify(usuarioFirmado));
    }

    public getUsuarioFirmado() {
        let usuarioFirmado: UsuarioFirmado = null;
        try {
            usuarioFirmado = JSON.parse(sessionStorage.getItem('usuarioFirmado'));
        } catch(e) {
          
        }

        return usuarioFirmado;
    }

    public agregarDatosTelefono(usuario: string, imei:string) {
        let datosTelefono: any = {
              'usuario': usuario,
              'imei': imei
        };
        
        sessionStorage.clear();
        sessionStorage.setItem('datosTelefono', JSON.stringify(datosTelefono));
    }

    public getDatosTelefono() {
        let datosTelefono: any;

        try {
            datosTelefono = JSON.parse(sessionStorage.getItem('datosTelefono'));
        } catch(e) {
          
        }

        if (! datosTelefono) {
            datosTelefono = {
                'usuario': '',
                'imei': ''              
            };
        }
        
        return datosTelefono;
    } 

    public limpiaDatos() {
        sessionStorage.clear();
    }
}
