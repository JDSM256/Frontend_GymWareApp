import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  nombre_usuario:any;
  rol:any;

constructor(private router:Router){}


  ngOnInit(): void {
    this.nombre_usuario= sessionStorage.getItem("nombre_usuario");
    this.rol=sessionStorage.getItem("rol");
  }

  cerrar(){
    sessionStorage.setItem("id_usuario",  "");
    sessionStorage.setItem("email_usuario", "");
    sessionStorage.setItem("nombre", "" );
    sessionStorage.setItem("rol", "" );
    this.router.navigate(['login']);

  }
}
