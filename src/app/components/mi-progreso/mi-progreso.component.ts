import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogDetallePromocionComponent } from 'app/components/dialog-detalle-promocion/dialog-detalle-promocion.component';

@Component({
  selector: 'app-mi-progreso',
  templateUrl: './mi-progreso.component.html',
  styleUrls: ['./mi-progreso.component.css']
})
export class MiProgresoComponent {

    constructor(public dialog: MatDialog) { }

    public muestraDetalle(tipoPromocion:number){
        switch (tipoPromocion) {
            case 1:
                this.dialog.open(DialogDetallePromocionComponent, {
                    data: {
                        'tipoPromocion': tipoPromocion,
                        'titulo': 'Boleto doble para la rifa por el Gran Premio',
                        'mensaje': 'Los 3 empleados de cada región que traigan más clientes durante el primer trimestre, ganan boletos dobles para el Gran Premio',
                        'vigencia': 'Tienes hasta el primer trimestre',
                        'totalClientes': 0,
                        'totalReferidos': 0,
                        'puesto': 1000
                    }
                });
                break;
            case 2:
                this.dialog.open(DialogDetallePromocionComponent, {
                    data: {
                        'tipoPromocion': tipoPromocion,
                        'titulo': 'Boleto doble para la rifa por el Gran Premio',
                        'mensaje': 'Si para el 30 de junio trajiste 50 clientes o más, ganas tu boleto doble automáticamente',
                        'vigencia': 'Tienes hasta el 30 de junio',
                        'totalClientes': 4,
                        'totalReferidos': 50,
                        'puesto': 0
                    }
                });
                break;
            case 3:
                this.dialog.open(DialogDetallePromocionComponent, {
                    data: {
                        'tipoPromocion': tipoPromocion,
                        'titulo': 'Rifa por 10 boleto dobles para el Gran Premio',
                        'mensaje': 'Cada mes, lo empleados que haya traido por lo memos 2 clientes, entrarán a una rifa por 10 boletos dobles para el Gran Premio',
                        'vigencia': 'Tienes hasta el 30 de junio',
                        'totalClientes': 2,
                        'totalReferidos': 4,
                        'puesto': 0
                    }
                });
                break;
            case 4:
                this.dialog.open(DialogDetallePromocionComponent, {
                    data: {
                        'tipoPromocion': tipoPromocion,
                        'titulo': 'Rifa por 10 boleto dobles para el Gran Premio',
                        'mensaje': 'Cada mes, lo empleados que haya traido por lo memos 2 clientes, entrarán a una rifa por 10 boletos dobles para el Gran Premio',
                        'vigencia': 'Tienes hasta el 30 de junio',
                        'totalClientes': 2,
                        'totalReferidos': 4,
                        'puesto': 0
                    }
                });
                break;
            case 5:
                this.dialog.open(DialogDetallePromocionComponent, {
                    data: {
                        'tipoPromocion': tipoPromocion,
                        'titulo': 'Rifa por 10 boleto dobles para el Gran Premio',
                        'mensaje': 'Cada mes, lo empleados que haya traido por lo memos 2 clientes, entrarán a una rifa por 10 boletos dobles para el Gran Premio',
                        'vigencia': 'Tienes hasta el 30 de junio',
                        'totalClientes': 2,
                        'totalReferidos': 4,
                        'puesto': 0
                    }
                });
                break;
        }
    }
}
