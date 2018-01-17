import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map'

import { environment } from 'environments/environment';
import { Usuario } from 'app/interfaces/usuario'
import { UsuarioFirmado } from 'app/interfaces/usuario-firmado'
import { Referido } from 'app/interfaces/referido'

@Injectable()
export class ReferidosService {
  private apiURL: string = environment.apiURL;
  private loginPath: string = '/access/login.json?';
  private getReferidosPath: string = '/api/ref/getList.json?';
  private guardarReferidoPath: string = '/api/ref/saveReferido.json?';
  private getRegionesPath: string = '/api/ref/getRegionList.json';
  private getZonasPath: string = '/api/ref/getZonaList.json?';
  private getSucursalesPath: string = '/api/ref/getSucList.json?';

  constructor(private http:Http) {
    
  }

  public login(usuario: Usuario) {
    let loginURL = this.apiURL + this.loginPath;
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let params: string = '';
    params += 'password=' + usuario.password; 
    params += '&user=' + usuario.usuario;
    params += '&imei=' + usuario.imei;

    return this.http.post(loginURL + params, null, { headers })
                    .map( res=>{
                      return res.json();
                    });
  }

  public getReferidos(token: string) {
    let getReferidosURL = this.apiURL + this.getReferidosPath;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': 'true',
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(getReferidosURL, null, { headers })
                    .map( res=>{
                      return res.json();
                    });
  }

  public guardarReferido(referido: Referido, token: string) {
    let guardarReferidosURL = this.apiURL + this.guardarReferidoPath;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': 'true',
      'Authorization': 'Bearer ' + token
    });

    let params: string = '';
    params += 'razonSocial=' + referido.razonSocial;
    params += '&nombre=' + referido.nombre;
    params += '&appat=' + referido.appat;
    params += '&apmat=' + referido.apmat;
    params += '&tipo=' + referido.tipo;
    params += '&fecNac=' + referido.fechaNacimiento;
    params += '&ventas=' + referido.ventasAnuales; 
    params += '&correo=' + referido.correo;
    params += '&telefono=' + referido.telefono;
    params += '&rfc=' + referido.rfc;
    if (referido.id) {
      params += '&id=' + referido.id;
    }    

    if (referido.idSucursal) {
      params += '&sucursal=' + referido.idSucursal;
    } else {
      params += '&sucursal=0';
    }
    
    return this.http.post(guardarReferidosURL + params, null, { headers })
                    .map( res=>{
                      return res.json();
                    });
  }

  public getRegiones(token: string) {
    let regionesURL = this.apiURL + this.getRegionesPath;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': 'true',
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(regionesURL, null, { headers })
                    .map( res=>{
                      return res.json();
                    });
  }

  public getZonas(idRegion: string, token: string) {
    let zonasURL = this.apiURL + this.getZonasPath;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': 'true',
      'Authorization': 'Bearer ' + token
    });

    let params: string = '';
    params += 'id=' + idRegion;

    return this.http.post(zonasURL + params, null, { headers })
                    .map( res=>{
                      return res.json();
                    });
  }

  public getSucursales(idZona: string, token: string) {
    let sucursalesURL = this.apiURL + this.getSucursalesPath;
    let headers = new Headers({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': 'true',
      'Authorization': 'Bearer ' + token
    });

    let params: string = '';
    params += 'id=' + idZona;

    return this.http.post(sucursalesURL + params, null, { headers })
                    .map( res=>{
                      return res.json();
                    });
  }
}
