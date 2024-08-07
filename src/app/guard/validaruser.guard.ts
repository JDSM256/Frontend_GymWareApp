import { Component, Injectable } from "@angular/core";
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";

// import { CanActivateFn } from '@angular/router';
import { LoginComponent } from '../modulos/login/login.component';
import { LoginService } from "../servicios/login.service";

// export const validaruserGuard: CanActivateFn = (route, state) => {
//   return true;
// };
@Injectable({
  providedIn:'root'
})


export class validaruserGuard implements CanActivate{

  id_user:any;

  constructor (private router:Router){}
  

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.id_user=sessionStorage.getItem('id_usuario');

      if(this.id_user==null || this.id_user==""){
        this.router.navigate(['login']);
        return false;
      }

    return true;

    

  }
}


