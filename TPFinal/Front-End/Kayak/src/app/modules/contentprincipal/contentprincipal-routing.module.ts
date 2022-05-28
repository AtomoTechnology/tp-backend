import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentprincipalComponent } from 'src/app/components/menu/contentprincipal/contentprincipal.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RoleGuardGuard } from 'src/app/guard/role-guard.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ContentprincipalComponent,
  //   canLoad: [AuthGuard],
  //   canActivate: [RoleGuardGuard],
  //    data: {
  //     expectedRole: 'admin',
  //      title: 'Home'
  //     },
  //    children: [{
  //     path: 'User',
  //     loadChildren:() => import("../../modules/user/user.module").then((p) => p.UserModule)
  //   },
  //   {
  //     path: 'Kayak',
  //     loadChildren:() => import("../kayak/kayak.module").then((p) => p.KayakModule)
  //   },
  //   {
  //     path:'Location',
  //     loadChildren:() => import('../../modules/location/location.module').then((p) => p.LocationModule)
  //   },
  //   {
  //     path:'Hanger',
  //     loadChildren:() => import('../../modules/hanger/hanger.module').then((p) => p.HangerModule)
  //   }    
  // ]
  // } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentprincipalRoutingModule { }
