import { Component, OnInit } from '@angular/core';

import { DialogNuevoReferidoComponent } from 'app/components/dialog-nuevo-referido/dialog-nuevo-referido.component';
import { DialogBasesComponent } from 'app/components/dialog-bases/dialog-bases.component';

import { MatDialog } from '@angular/material';
import { ReferidosService } from 'app/services/referidos/referidos.service';
import { SesionService } from 'app/services/referidos/sesion.service';

import { UsuarioFirmado } from 'app/interfaces/usuario-firmado'
import { environment } from 'environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{
  public isUltimosReferidos:boolean = false;
  public isMiprogresoSeleccionado:boolean = true;
  public isMisReferidosSeleccionado:boolean = false;
  public recargaMisReferidos: boolean = false;
  
  public usuarioFirmado:UsuarioFirmado;
  public ultimosReferidos:any[];
  
  private TIPO_PARTICULAR:number = environment.TIPO_PARTICULAR;
  private TIPO_PYME:number = environment.TIPO_PYME;

  constructor(private referidosService: ReferidosService,
              private sesionService: SesionService,
              public dialog: MatDialog) { 
    this.isUltimosReferidos = true;

    this.usuarioFirmado = this.sesionService.getUsuarioFirmado();
    let token:string = this.usuarioFirmado.token;

    referidosService.getReferidos(token)
                    .subscribe(res => {
                        this.isUltimosReferidos = false;
                        if (res.exitoso) {
                            this.ultimosReferidos = res.datos;
                        }
                    },
                    error => {
                        this.isUltimosReferidos = false;
                    });
  }

  ngOnInit(){
      setTimeout(() => {
        this.muestraBases();
      }, 500); 
  }

 public muestraBases() {
    this.dialog.open(DialogBasesComponent, {
        data: {}
    });
 }

 public muestraMisReferidos(){
        if (! this.isMisReferidosSeleccionado) {
            this.isMisReferidosSeleccionado = ! this.isMisReferidosSeleccionado;
            this.isMiprogresoSeleccionado = ! this.isMiprogresoSeleccionado;
        }
  }

  public muestraMiProgreso (){
        if (! this.isMiprogresoSeleccionado) {
            this.isMiprogresoSeleccionado = ! this.isMiprogresoSeleccionado;
            this.isMisReferidosSeleccionado = ! this.isMisReferidosSeleccionado;
        }            
  }

  public nuevoReferido() {
        let dialogRef = this.dialog.open(DialogNuevoReferidoComponent, {
            data: {},
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(recargaMisReferidos => {
            if (recargaMisReferidos) {
                this.recargaMisReferidos = recargaMisReferidos;
            }
        });
  } 
}
