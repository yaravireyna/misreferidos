import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-detalle-sucursal',
  templateUrl: './dialog-detalle-sucursal.component.html',
  styleUrls: ['./dialog-detalle-sucursal.component.css']
})
export class DialogDetalleSucursalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
