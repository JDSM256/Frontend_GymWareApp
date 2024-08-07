import { Component } from '@angular/core';
import { Console, log } from 'node:console';
import Swal from 'sweetalert2';
import { subscribe } from 'node:diagnostics_channel';

import { PlanesService } from '../../servicios/planes.service';

@Component({
  selector: 'app-plans',
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.scss'
})
export class PlanesComponent {
plan:any;
id_plan:any;

  
  obj_plan={
    codigo_plan:"",
    nombre_plan:"",
    precio_plan:"",
  
  }

  validar_codigo_plan=true;
  validar_nombre_plan=true;
  validar_precio_plan=true;
  show_form=false;
  botones_form=false;

  constructor(private splan:PlanesService){}

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.consulta();
    }

    consulta(){
      this.splan.consultar().subscribe((resultado:any) =>{
        this.plan=resultado;
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
      if (this.obj_plan.codigo_plan==""){
        this.validar_codigo_plan=false;
      }else{
        this.validar_codigo_plan=true;
      }
      if (this.obj_plan.nombre_plan==""){
          this.validar_nombre_plan=false;
      }else{
        this.validar_nombre_plan=true;
      }
      if (this.obj_plan.precio_plan==""){
          this.validar_precio_plan=false;
      }else{
        this.validar_precio_plan=true;
      }
      if (this.validar_codigo_plan==true && this.validar_nombre_plan==true && this.validar_precio_plan==true  &&funcion=='guardar'){
      this.guardar();
      }
      if (this.validar_codigo_plan==true && this.validar_nombre_plan==true && this.validar_precio_plan==true && funcion=='editar'){
        this.editar();
        }
      }

      limpiar(){
        this.obj_plan={
          codigo_plan:"",
          nombre_plan:"",
          precio_plan:"",
        }
      }   
    
 
    guardar(){
      this.splan.insertar(this.obj_plan).subscribe((dato:any)=>{ if(dato['resultado']=='ok'){
        this.consulta();
      }});
      this.limpiar();
      this.mostrar_formulario('no ver');
      this.consulta();
    }

    eliminar(id:number){
      Swal.fire({
        title: "Estas seguro de eliminar el plan?",
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
          this.splan.eliminar(id).subscribe((datos:any)=> {
            if(datos['resultado']=='ok'){
              this.consulta();
            }
          })
          
          ///////
          Swal.fire({
  
           title: "Eliminado",
            text: "El plan ha sido eliminado con exito",
            icon: "success"
          });
        }
      });
      
      

    }

    cargar_datos(items:any, id:number){

      this.obj_plan={
        codigo_plan: items.codigo_plan,
        nombre_plan:items.nombre_plan,
        precio_plan:items.precio_plan,       
      }
      this.id_plan=id;

      this.botones_form=true;
      this.mostrar_formulario('ver');

    }

    editar(){
      this.splan.editar(this.id_plan,this.obj_plan).subscribe((datos:any)=>{
        if(datos['resultado']=='ok'){
          this.consulta();
        }
      });
      this.limpiar();
      this.mostrar_formulario('no ver');
    }

}




