import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent {

  nombre:any;
  rol:any;

  constructor(private router:Router){}


  ngOnInit(): void {
   this.nombre=sessionStorage.getItem('nombre_usuario');
   this.rol=sessionStorage.getItem('rol')
  }

}
