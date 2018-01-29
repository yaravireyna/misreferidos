import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';

declare var Desafio;

@Component({
  selector: 'app-dialog-terminos-condiciones',
  templateUrl: './dialog-terminos-condiciones.component.html',
  styleUrls: ['./dialog-terminos-condiciones.component.css']
})
export class DialogTerminosCondicionesComponent{
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef:MatDialogRef<DialogTerminosCondicionesComponent>) {
  }

  public cerrar() {
    this.dialogRef.close();
}

  public abreTerminosCondiciones(){
    Desafio.abreTerminosCondiciones();
  }

}
