import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { SesionService } from 'app/services/referidos/sesion.service';
import { ReferidosService } from 'app/services/referidos/referidos.service';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { Referido } from 'app/interfaces/referido';
import { UsuarioFirmado } from 'app/interfaces/usuario-firmado';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-dialog-detalle-referido',
  templateUrl: './dialog-detalle-referido.component.html',
  styleUrls: ['./dialog-detalle-referido.component.css']
})

export class DialogDetalleReferidoComponent {
    public formaParticular:FormGroup;
    public formaPyme:FormGroup;
    private referido:Referido;

    public isParticular: boolean = false;
    public isPyme: boolean = false;
    
    public isDisabledCamposParticular: boolean = true;
    public isDisabledCamposPyme: boolean = true;

    private recargaMisReferidos:boolean = false;

    private usuarioFirmado:UsuarioFirmado;
    
    public TIPO_PARTICULAR:number = environment.TIPO_PARTICULAR;
    public TIPO_PYME:number = environment.TIPO_PYME;
        
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogRef:MatDialogRef<DialogDetalleReferidoComponent>,
                private referidosService: ReferidosService,
                private sesionService: SesionService,
                private router: Router,
                public dialog: MatDialog,
                public snackBar: MatSnackBar) { 
        this.usuarioFirmado = this.sesionService.getUsuarioFirmado();
        
        if (data.referido.tipo == this.TIPO_PARTICULAR) {
            this.formaParticular = new FormGroup({
                'nombre': new FormControl({value: data.referido.nombre, disabled: this.isDisabledCamposParticular},  [
                                                Validators.required
                                                ]),
                'appat': new FormControl({value: data.referido.apPat, disabled: this.isDisabledCamposParticular},  [
                                                Validators.required
                                                ]),
                'apmat': new FormControl({value: data.referido.apMat, disabled: this.isDisabledCamposParticular},  [
                                                Validators.required
                                                ]),
                'fechaNacimiento': new FormControl({value: data.referido.fecNac, disabled: this.isDisabledCamposParticular},  [
                                                Validators.required,
                                                this.fechaInvalida
                                                ]),
                'correo': new FormControl({value: data.referido.correo, disabled: this.isDisabledCamposParticular},  [
                                                Validators.required,
                                                Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$")
                                                ]),
                'telefono': new FormControl({value: data.referido.telefono, disabled: this.isDisabledCamposParticular},  [
                                                Validators.required,
                                                Validators.pattern("^[0-9]+$")
                                                ]),
                'rfc': new FormControl({value: data.referido.rfc, disabled: this.isDisabledCamposParticular},  []),
                'id': new FormControl(data.referido.idProsp , [])
            });
        } else if (data.referido.tipo == this.TIPO_PYME) {
            this.formaPyme = new FormGroup({
                'nombre': new FormControl({value: data.referido.nombre, disabled: this.isDisabledCamposPyme}, [
                                                Validators.required
                                                ]),
                'appat': new FormControl({value: data.referido.apPat, disabled: this.isDisabledCamposParticular},  [
                                                Validators.required
                                                ]),
                'apmat': new FormControl({value: data.referido.apMat, disabled: this.isDisabledCamposParticular},  [
                                                Validators.required
                                                ]),
                'razonSocial': new FormControl({value: data.referido.razonSocial, disabled: this.isDisabledCamposPyme},  [
                                                Validators.required
                                                ]),
                'ventasAnuales': new FormControl({value: data.referido.ventas, disabled: this.isDisabledCamposPyme},  [
                                                Validators.pattern("^[0-9]+$"),
                                                Validators.required
                                                ]),
                'correo': new FormControl({value: data.referido.correo, disabled: this.isDisabledCamposPyme},  [
                                                Validators.required,
                                                Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$")
                                                ]),
                'telefono': new FormControl({value: data.referido.telefono, disabled: this.isDisabledCamposPyme} ,  [
                                                Validators.required,
                                                Validators.pattern("^[0-9]+$")
                                                ]),
                'rfc': new FormControl({value: data.referido.rfc, disabled: this.isDisabledCamposPyme} , []),
                'id': new FormControl(data.referido.idProsp , [])
            });
        }
    }

    public guardaReferidoParticular(){
        if (! this.formaParticular.valid) {
            this.muestraAlertaError();
            return;
        }

        this.referido = this.formaParticular.value;
        this.referido.tipo = this.TIPO_PARTICULAR;
        let token = this.usuarioFirmado.token;

        this.isParticular = true;
        
        this.referidosService.guardarReferido(this.referido, token)
                        .subscribe(res => {
                            this.isParticular = false;
                            if (res.exitoso) {
                                this.editarCamposParticular();
                                this.muestraAlertaExito();
                                this.recargaMisReferidos = true;
                            } else {
                                this.muestraAlertaReintento();
                            }                        
                        },
                        error => {
                            this.muestraAlertaReintento();
                            this.isParticular = false;                        
                        });                            
    }

    public guardaReferidoPyme(){
        if (! this.formaPyme.valid) {
            this.muestraAlertaError();
            return;
        }

        this.referido = this.formaPyme.value;
        this.referido.tipo = this.TIPO_PYME;
        let token = this.usuarioFirmado.token;

        this.isPyme = true;
        
        this.referidosService.guardarReferido(this.referido, token)
                        .subscribe(res => {
                            this.isPyme = false;
                            if (res.exitoso) {
                                this.editarCamposPyme();
                                this.muestraAlertaExito();
                                this.recargaMisReferidos = true;
                            } else {
                                this.muestraAlertaReintento();
                            }
                        },
                        error => {
                            this.isPyme = false;
                            this.muestraAlertaReintento();
                        });                            
        
    }

    public cerrar() {
        this.dialogRef.close(this.recargaMisReferidos);
    }

    public editarCamposParticular(){
        this.isDisabledCamposParticular = ! this.isDisabledCamposParticular;
        
        if (this.isDisabledCamposParticular) {
            this.formaParticular.get('nombre').disable();
            this.formaParticular.get('appat').disable();
            this.formaParticular.get('apmat').disable();
            this.formaParticular.get('fechaNacimiento').disable();
            this.formaParticular.get('correo').disable();
            this.formaParticular.get('telefono').disable();
            this.formaParticular.get('rfc').disable();
        } else {
            this.formaParticular.get('nombre').enable();
            this.formaParticular.get('appat').enable();
            this.formaParticular.get('apmat').enable();
            this.formaParticular.get('fechaNacimiento').enable();
            this.formaParticular.get('correo').enable();
            this.formaParticular.get('telefono').enable();
            this.formaParticular.get('rfc').enable();
        }
    }

    public editarCamposPyme(){
        this.isDisabledCamposPyme = ! this.isDisabledCamposPyme;
        if (this.isDisabledCamposPyme) {
            this.formaPyme.get('nombre').disable();
            this.formaPyme.get('appat').disable();
            this.formaPyme.get('apmat').disable();
            this.formaPyme.get('razonSocial').disable();
            this.formaPyme.get('ventasAnuales').disable();
            this.formaPyme.get('telefono').disable();
            this.formaPyme.get('correo').disable();
            this.formaPyme.get('rfc').disable();
        } else {
            this.formaPyme.get('nombre').enable();
            this.formaPyme.get('appat').enable();
            this.formaPyme.get('apmat').enable();
            this.formaPyme.get('razonSocial').enable();
            this.formaPyme.get('ventasAnuales').enable();
            this.formaPyme.get('telefono').enable();
            this.formaPyme.get('correo').enable();
            this.formaPyme.get('rfc').enable();
        }
    }

    private muestraAlertaError() {
        this.snackBar.open("Debes completar todos los campos.", undefined, {
            duration: 3000,
            extraClasses: ['success-snackbar']
        });
    }

    private muestraAlertaReintento() {
        this.snackBar.open("Operación no completada, vuelva a intentarlo.", undefined, {
            duration: 3000,
            extraClasses: ['success-snackbar']
        });
    }

    private muestraAlertaExito() {
        this.snackBar.open("Referido actualizado", undefined, {
            duration: 3000,
            extraClasses: ['blue-snackbar']
        });
    }

    private fechaInvalida(control: FormControl): { [s:string]:boolean }  {
        try {
            let fechaPartes:any[] = control.value.split('/');
            let fechaFormato:string = `${fechaPartes[1]}/${fechaPartes[0]}/${fechaPartes[2]}`;
            let fecha = new Date(fechaFormato);
            if (fecha.getTime() > 0 || fechaPartes.length != 3) {
                return null;
            }
        } catch(e){}

        return {
            fechaInvalida:true
        }
    }
}
