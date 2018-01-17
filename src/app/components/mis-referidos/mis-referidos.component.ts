import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { MatDialog } from '@angular/material';

import { DialogDetalleReferidoComponent } from 'app/components/dialog-detalle-referido/dialog-detalle-referido.component';

import { ReferidosService } from 'app/services/referidos/referidos.service';
import { SesionService } from 'app/services/referidos/sesion.service';

import { UsuarioFirmado } from 'app/interfaces/usuario-firmado'

import { environment } from 'environments/environment';

@Component({
  selector: 'app-mis-referidos',
  templateUrl: './mis-referidos.component.html',
  styleUrls: ['./mis-referidos.component.css']
})
export class MisReferidosComponent implements OnInit, OnChanges{
  public isReferidos:boolean = false;
  public usuarioFirmado:UsuarioFirmado;
  public referidosParticular:any[] = [];
  public referidosPyme:any[] = [];
  
  private TIPO_PARTICULAR:number = environment.TIPO_PARTICULAR;
  private TIPO_PYME:number = environment.TIPO_PYME;

  @Input()
  public recargaMisReferidos: boolean;

  constructor(private referidosService: ReferidosService,
              private sesionService: SesionService,
              public dialog: MatDialog) { 
    this.usuarioFirmado = this.sesionService.getUsuarioFirmado();    
  }

  ngOnChanges(changes: SimpleChanges){
    if (! changes.recargaMisReferidos.firstChange && changes.recargaMisReferidos.currentValue) {
        this.getReferidos();    
    }
  }

  ngOnInit(){
    this.getReferidos();
  }

  private getReferidos() {
    this.referidosParticular = [];
    this.referidosPyme = [];
    let referidos:any[] = [];

    this.isReferidos = true;
    let token:string = this.usuarioFirmado.token;
    
    this.referidosService.getReferidos(token)
                    .subscribe(res => {
                        this.isReferidos = false;
                        if (res.exitoso) {
                            referidos = res.datos;
                            this.serparaReferidosPorSegmento(referidos)
                        }                        
                    },
                    error => {
                        this.isReferidos = false;
                    });
  }

  private serparaReferidosPorSegmento(referidos:any[]) {
    for (let referido of referidos) {
        if (referido.tipo == this.TIPO_PARTICULAR) {
            this.referidosParticular.push(referido);
        } else if (referido.tipo == this.TIPO_PYME) {
            this.referidosPyme.push(referido);
        }
    }
  }

  private muestraDetalle(referido){
    let dialogRef = this.dialog.open(DialogDetalleReferidoComponent, {
            data: {
                "referido": referido
            },
            disableClose: true
    });

    dialogRef.afterClosed().subscribe(recargaMisReferidos => {
        if (recargaMisReferidos) {
            this.getReferidos();
        }
    });
  }

}
