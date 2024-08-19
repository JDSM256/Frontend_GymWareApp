import { Component } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email_usuario:any;
  clave: any;
  error= false;
  usuario:any; 
  id_usuario:any;

  user= {
    cedula:"",
    nombre_usuario:"",
    direccion:"",
    fecha_nacimiento:"",
    celular:"",
    email_usuario:"",
    rol:"",
    clave:"",

  }

constructor (private slogin: LoginService, private router: Router){}

ngOnInit(): void {
  sessionStorage.setItem("id_usuario",  "");
  sessionStorage.setItem("email_usuario", "");  
  sessionStorage.setItem("nombre_usuario", "" );
  sessionStorage.setItem("rol", "" );
 
}

consulta(tecla:any){
  if(tecla==13  || tecla==""){
    this.slogin.consultar(this.email_usuario, this.clave).subscribe((resultado:any)=>{
      this.usuario=resultado;
      console.log(this.usuario);

      if(this.usuario[0].validar=='valida'){
        sessionStorage.setItem("id_usuario", this.usuario[0]['id_usuario']);
        sessionStorage.setItem("email_usuario", this.usuario[0]['email_usuario']);
        sessionStorage.setItem("nombre_usuario", this.usuario[0]['nombre_usuario']);
        sessionStorage.setItem("rol", this.usuario[0]['rol']);
        this.router.navigate(['dashboard']);
        console.log('ingreso');
      }else{
        console.log('no entro');
        this.error= true;
      }

      
    });
  }
}

}
