import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-detalle-promocion',
  templateUrl: './dialog-detalle-promocion.component.html',
  styleUrls: ['./dialog-detalle-promocion.component.css']
})
export class DialogDetallePromocionComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef:MatDialogRef<DialogDetallePromocionComponent>) { }

  public cerrar() {
      this.dialogRef.close();
  }
}
