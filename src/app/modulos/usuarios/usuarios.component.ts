import { Component } from '@angular/core';

import { Console, log } from 'node:console';
import Swal from 'sweetalert2';
import { subscribe } from 'node:diagnostics_channel';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
usuario:any;
id_usuario:any;

  
  obj_usuario={
    cedula:"",
    nombre_usuario:"",
    direccion:"",
    fecha_nacimiento:"",
    celular:"",
    email_usuario:"",
    rol:"",
    clave:"",
    
  }

  validar_cedula=true;
  validar_nombre_usuario=true;
  validar_direccion=true;
  validar_fecha_nacimiento=true;
  validar_celular=true;
  validar_email_usuario=true;
  validar_rol=true;
  validar_clave=true;
  show_form=false;
  botones_form=false;

  constructor(private susuario:UsuarioService){}

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.consulta();
    }

    consulta(){
      this.susuario.consultar().subscribe((resultado:any) =>{
        this.usuario=resultado;
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
      if (this.obj_usuario.cedula==""){
        this.validar_cedula=false;
      }else{
        this.validar_cedula=true;
      }
      if (this.obj_usuario.nombre_usuario==""){
          this.validar_nombre_usuario=false;
      }else{
        this.validar_nombre_usuario=true;
      }
      if (this.obj_usuario.direccion==""){
          this.validar_direccion=false;
      }else{
        this.validar_direccion=true;
      }
      if (this.obj_usuario.fecha_nacimiento==""){
          this.validar_fecha_nacimiento=false;
      }else{
        this.validar_fecha_nacimiento=true;
      }
      if (this.obj_usuario.celular==""){
          this.validar_celular=false;
      }else{
        this.validar_celular=true;
      }
      if (this.obj_usuario.email_usuario==""){
          this.validar_email_usuario=false;
      }else{
        this.validar_email_usuario=true;
      }
       if (this.obj_usuario.rol==""){
          this.validar_rol=false;
      }else{
        this.validar_rol=true;
      }
      if (this.obj_usuario.clave==""){
        this.validar_clave=false;
    }else{
      this.validar_clave=true;
    }
      if (this.validar_cedula==true && this.validar_nombre_usuario==true && this.validar_direccion==true && this.validar_email_usuario==true && this.validar_fecha_nacimiento==true && this.validar_rol==true&& this.validar_clave==true &&funcion=='guardar'){
      this.guardar();
      }
      if (this.validar_cedula==true && this.validar_nombre_usuario==true && this.validar_direccion==true && this.validar_email_usuario==true && this.validar_fecha_nacimiento==true && this.validar_rol==true&& this.validar_clave==true &&funcion=='editar'){
        this.editar();
        }
      }

      limpiar(){
        this.obj_usuario={
          cedula:"",
          nombre_usuario:"",
          direccion:"",
          fecha_nacimiento:"",
          celular:"",
          email_usuario:"",
          rol:"",
          clave:"",
          
        }
      }   
    
 
    guardar(){
      this.susuario.insertar(this.obj_usuario).subscribe((dato:any)=>{ if(dato['resultado']=='ok'){
        this.consulta();
      }});
      this.limpiar();
      this.mostrar_formulario('no ver');
      this.consulta();
    }

    eliminar(id:number){
      Swal.fire({
        title: "Estas seguro de eliminar el usuario?",
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
          this.susuario.eliminar(id).subscribe((datos:any)=> {
            if(datos['resultado']=='ok'){
              this.consulta();
            }
          })
          
          ///////
          Swal.fire({
  
           title: "Eliminado",
            text: "El usuario ha sido eliminado con exito",
            icon: "success"
          });
        }
      });
      
      

    }

    cargar_datos(items:any, id:number){

      this.obj_usuario={
        cedula: items.cedula,
        nombre_usuario:items.nombre_usuario,
        direccion:items.direccion,
        fecha_nacimiento:items.fecha_nacimiento,
        celular:items.celular,
        email_usuario:items.email_usuario,
        rol:items.rol,
        clave:items.clave,
        
      }
      this.id_usuario=id;

      this.botones_form=true;
      this.mostrar_formulario('ver');

    }

    editar(){
      this.susuario.editar(this.id_usuario,this.obj_usuario).subscribe((datos:any)=>{
        if(datos['resultado']=='ok'){
          this.consulta();
        }
      });
      this.limpiar();
      this.mostrar_formulario('no ver');
    }

}

