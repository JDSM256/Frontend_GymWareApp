import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url= 'http://localhost/gymware/backend/controlador/login.php';

  constructor(private http: HttpClient) {}

  consultar(email_usuario:any, clave:any){
    return this.http.get(`${this.url}?email_usuario=${email_usuario}&clave=${clave}`);
  }
}
