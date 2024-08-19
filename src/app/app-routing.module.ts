import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { PlanesComponent } from './modulos/planes/planes.component';
import { VentaComponent } from './modulos/venta/venta.component';
import { ClientesComponent } from './modulos/clientes/clientes.component';
import { LoginComponent } from './modulos/login/login.component';
import { NoEncontroComponent } from './modulos/no-encontro/no-encontro.component';
import { validaruserGuard } from './guard/validaruser.guard';
import { PedidoComponent } from './modulos/pedido/pedido.component';
import { PagInicialComponent } from './estructura/pag-inicial/pag-inicial.component';


const routes:Routes = [
  {path: '', component: PagInicialComponent},

  {
      path: '', component: PrincipalComponent,
      children: 
      [
          
          {path: 'dashboard', component: DashboardComponent, canActivate: [validaruserGuard]},
          {path: 'usuarios', component: UsuariosComponent, canActivate: [validaruserGuard]},
          {path: 'planes', component: PlanesComponent, canActivate: [validaruserGuard]},
          {path: 'venta', component: VentaComponent, canActivate: [validaruserGuard]},
          {path: 'clientes', component: ClientesComponent, canActivate: [validaruserGuard]},
          {path: 'pedido', component: PedidoComponent, canActivate: [validaruserGuard]},
          
          {path: '', redirectTo: 'paginicial', pathMatch: 'full'}
          
      ]

  },
  {path: 'paginicial', component: PagInicialComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NoEncontroComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
