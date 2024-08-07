import { Component } from '@angular/core';
import { ClientesService}  from '../../servicios/clientes.service';

import Swal from 'sweetalert2';
import { subscribe } from 'node:diagnostics_channel';
import { CiudadService } from '../../servicios/ciudad.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})

export class ClientesComponent {
cliente:any;
ciudad:any;
id_cliente:any;

  
  obj_cliente={
    identificacion:"",
    nombre_cliente:"",
    direccion_cliente:"",
    celular_cliente:"",
    email_cliente:"",
    fo_ciudad: 0
  }

  validar_identificacion=true;
  validar_nombre_cliente=true;
  validar_direccion_cliente=true;
  validar_celular_cliente=true;
  validar_email_cliente=true;

  show_form=false;
  botones_form=false;

  constructor(private scliente:ClientesService, private sciudad: CiudadService){}

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.consulta();
      this.consultac();
    }

    consulta(){
      this.scliente.consultar().subscribe((resultado:any) =>{
        this.cliente=resultado;
      })

    }

    consultac(){
      this.sciudad.consultar().subscribe((resultado:any) =>{
        this.ciudad=resultado;
      })

    }

    mostrar_formulario(dato:any) {
      
    
      switch(dato){
        case"ver":
       
        this.show_form=true;
        break;
        case"no ver":
        this.show_form=false;
        this.botones_form=false;
        break;


      }
    }


    validar(funcion:any){
      if (this.obj_cliente.identificacion==""){
        this.validar_identificacion=false;
      }else{
        this.validar_identificacion=true;
      }
      if (this.obj_cliente.nombre_cliente==""){
          this.validar_nombre_cliente=false;
      }else{
        this.validar_nombre_cliente=true;
      }
      if (this.obj_cliente.direccion_cliente==""){
          this.validar_direccion_cliente=false;
      }else{
        this.validar_direccion_cliente=true;
      }
      if (this.obj_cliente.celular_cliente==""){
          this.validar_celular_cliente=false;
      }else{
        this.validar_celular_cliente=true;
      }
      if (this.obj_cliente.email_cliente==""){
          this.validar_email_cliente=false;
      }else{
        this.validar_email_cliente=true;
      }
        if (this.validar_identificacion==true && this.validar_nombre_cliente==true && this.validar_direccion_cliente==true && this.validar_email_cliente==true && this.validar_celular_cliente==true &&funcion=='guardar'){
      this.guardar();
      }
      if (this.validar_identificacion==true && this.validar_nombre_cliente==true && this.validar_direccion_cliente==true && this.validar_email_cliente==true && this.validar_celular_cliente==true && funcion=='editar'){
        this.editar();
        }
      }

      limpiar(){

        this.obj_cliente={
          identificacion:"",
          nombre_cliente:"",
          direccion_cliente:"",
          celular_cliente:"",
          email_cliente:"",
          fo_ciudad:0     
        }
      }   
    
 
    guardar(){
      this.scliente.insertar(this.obj_cliente).subscribe((dato:any)=>{ if(dato['resultado']=='ok'){
        this.consulta();
      }});
      this.limpiar();
      this.mostrar_formulario('no ver');
      this.consulta();
    }

    eliminar(id:number){
      Swal.fire({
        title: "Estas seguro de eliminar el cliente?",
        text: "el proceso no podrá ser revertido",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si borrar",
        cancelButtonText:"Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          ///////
          this.scliente.eliminar(id).subscribe((datos:any)=> {
            if(datos['resultado']=='ok'){
              this.consulta();
            }
          })
          
          ///////
          Swal.fire({
  
           title: "Eliminado",
            text: "El cliente ha sido eliminado con exito",
            icon: "success"
          });
        }
      });
      
      

    }

    cargar_datos(items:any, id:number){

      this.obj_cliente={
        identificacion: items.identificacion,
        nombre_cliente:items.nombre_cliente,
        direccion_cliente:items.direccion_cliente,
        celular_cliente:items.celular_cliente,
        email_cliente:items.email_cliente,
        fo_ciudad:items.fo_ciudad
      }
      this.id_cliente=id;
      console.log(this.obj_cliente)

      this.botones_form=true;
      this.mostrar_formulario('ver');

    }

    editar(){
      
      this.scliente.editar(this.id_cliente,this.obj_cliente).subscribe((datos:any)=>{
        if(datos['resultado']=='ok'){
          console.log('---------desde aqui abajo los datos del editar---------')
          console.log(datos)
          this.consulta();
        }
      });
      this.limpiar();
      this.mostrar_formulario('no ver');
    }

}





