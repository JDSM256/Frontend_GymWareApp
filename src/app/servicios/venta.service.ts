import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VentaService {
  url='http://localhost/Gymware/backend/controlador/venta.php'

  constructor(private http: HttpClient) { }

  consultar(){
    return this.http.get(`${this.url}?control=consulta`);
  }

  eliminar(id:number){
    return this.http.get(`${this.url}?control=eliminar&id=${id}`);
  }

  insertar(params:any){
    return this.http.post(`${this.url}?control=insertar`, JSON.stringify(params));
  }

  editar(id:number, params:any){
    return this.http.post(`${this.url}?control=editar&id=${id}`, JSON.stringify(params));

  }

  filtro (datos:any){
    return this.http.get(`${this.url}?control=filtro&datos=${datos}`);
  }

  ccliente (datos:any){
    return this.http.get(`${this.url}?control=ccliente&datos=${datos}`);
  }

 
}
