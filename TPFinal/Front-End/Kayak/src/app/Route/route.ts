import { Routes } from "@angular/router";
import { AccountComponent } from "../components/account/account/account.component";
import { PrincipalComponent } from "../components/principal/principal/principal.component";

export const appRoutes: Routes = [
  {
    path: 'Browser',
    loadChildren:() => import("../modules/contentprincipal/contentprincipal.module").then((p) => p.ContentprincipalModule)
  },
  {
    path: 'Home',
    component: PrincipalComponent,
     data: {title: 'Acceder al sistema'}
  },
  {
    path: 'Account',
    component: AccountComponent,
     data: {title: 'Acceder al sistema'}
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
