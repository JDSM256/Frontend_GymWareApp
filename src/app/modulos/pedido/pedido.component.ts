import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from '../../servicios/pedido.service';

import { PlanesService } from '../../servicios/planes.service';
import { ClientesService } from '../../servicios/clientes.service';
import { VentaService } from '../../servicios/venta.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.scss'
})
export class PedidoComponent {

  planes:any;
  cliente:any;
  identificacion="";
  nombre_cliente="";
  matriz_producto: any=[];

  arreglo_productos:any=[];

  total:any=0;

  pedido={
    fecha:"",
    fo_cliente:0,
    planes:[],
    subtotal:0,
    total:0,
  }

 
  constructor(private router:Router, private splanes: PlanesService, private scliente:ClientesService, private sventas: VentaService, private spedido:PedidoService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.consulta_planes();
    
  }

    consulta_planes(){
      this.splanes.consultar().subscribe((resultado:any)=>{
        this.planes=resultado;
      })
    }

    consulta_cliente(){
      this.scliente.ccliente(this.identificacion).subscribe((resultado:any)=>{
        this.cliente=resultado;
        this.nombre_cliente=this.cliente[0].nombre_cliente;
        console.log(this.cliente)
      })
      // this.scliente.ccliente(this.identificacion).subscribe((resultado:any)=>{
      //   this.cliente=resultado;
      //   console.log(this.cliente)
      //   // this.nombre_cliente=this.cliente[0].nombre;
      //    })
      
    }

    seleccionar(valores:any, id_plan:number){
      let cantidad=Number(prompt('Ingrese la cantidad de planes a pagar'));
      this.arreglo_productos=[valores.codigo_plan, valores.nombre_plan, Number(valores.precio_plan), cantidad, cantidad* Number (valores.precio_plan)];
      this.matriz_producto.push(this.arreglo_productos);
      
      let largo = this.matriz_producto.length;
      this.total=0;
      for (let i=0; i<largo; i++){
        this.total=this.total+this.matriz_producto[i][4];
      }

      }

    guardar(){

      let fecha= new Date();
      this.pedido.fecha=`${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
      this.pedido.fo_cliente=Number(this.cliente[0].id_cliente);
      this.pedido.planes=this.matriz_producto;
      this.pedido.subtotal=this.total;
      this.pedido.total=this.total;
      console.log(this.pedido);

      this.spedido.insertar(this.pedido).subscribe((datos:any)=>{
        if(datos['resultado']=='ok'){
          console.log(datos['resultado']);
          this.router.navigate(['venta']);
        }
      });
    }



    }

