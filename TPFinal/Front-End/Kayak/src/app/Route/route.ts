import { Routes } from "@angular/router";

export const appRoutes: Routes = [
  {
    path: 'Home',
    loadChildren: () => import('../home/home.module').then( m => m.HomeModule)
  },
  {
    path: 'Browser',
    loadChildren:() => import("../accountlogin/accountlogin.module").then( m => m.AccountloginModule)
  },
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/Home',
    pathMatch: 'full',
  }
];
