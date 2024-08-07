import { Component } from '@angular/core';
import { VentaService } from '../../servicios/venta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrl: './venta.component.scss'
})
export class VentaComponent {

  venta:any;

  constructor(private sventa:VentaService, private router:Router){}

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.consulta();
    }

    consulta(){
      this.sventa.consultar().subscribe((resultado:any) =>{
        this.venta=resultado;
      })

    }

    insertar(){
      this.router.navigate(['pedido'])
    }

}


