import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { RoleGuardGuard } from '../guard/role-guard.guard';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
     data: {
      expectedRole: 'admin',
       title: 'Home'
      },
     children: [
       {
        path: 'User',
        loadChildren:() => import("../accountlogin/user/user.module").then((p) => p.UserModule)
      },
      {
        path: 'Kayak',
        loadChildren:() => import("../accountlogin/kayak/kayak.module").then((p) => p.KayakModule)
      }, 
      {
        path:'Location',
        loadChildren:() => import('../modules/location/location.module').then((p) => p.LocationModule)
      },
      {
        path:'Hanger',
        loadChildren:() => import('../modules/hanger/hanger.module').then((p) => p.HangerModule)
      },
      {
        path: '',
        redirectTo: '/Browser/Kayak',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/Browser/Kayak',
        pathMatch: 'full'
      }    
  ]
  } 



  // {
  //   path: '',    
  //   children: [
  //   {
  //     path: '',
  //     component: MenuComponent,
  //     canLoad: [AuthGuard],
  //     canActivate: [RoleGuardGuard],
  //       data: {
  //       expectedRole: 'admin',
  //         title: 'Browser'
  //       }
  //   },
  //   {
  //     path: 'User',
  //     loadChildren:() => import("../accountlogin/user/user.module").then((p) => p.UserModule)
  //   },
  //   {
  //     path: 'Kayak',
  //     loadChildren:() => import("../accountlogin/kayak/kayak.module").then((p) => p.KayakModule)
  //   },
  //   {
  //     path: '',
  //     redirectTo: 'Browser',
  //     pathMatch: 'full'
  //   },
  //   {
  //     path: '**',
  //     redirectTo: 'Browser',
  //     pathMatch: 'full'
  //   } 
  // ]
  // } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountloginRoutingModule { }
