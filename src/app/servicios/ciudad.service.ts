import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  url='http://localhost/gymware/backend/controlador/ciudad.php'

  constructor(private http: HttpClient) { }

  consultar(){
    return this.http.get(`${this.url}`);
  }

}
