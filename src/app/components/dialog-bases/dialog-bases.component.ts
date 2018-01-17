import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-bases',
  templateUrl: './dialog-bases.component.html',
  styleUrls: ['./dialog-bases.component.css']
})
export class DialogBasesComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef:MatDialogRef<DialogBasesComponent>,) { }

  public cerrar() {
      this.dialogRef.close(); 
  }
}
