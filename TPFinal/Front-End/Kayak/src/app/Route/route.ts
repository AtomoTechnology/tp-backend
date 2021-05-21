import { Routes } from "@angular/router";
import { AccountComponent } from "../components/account/account/account.component";
import { PrincipalComponent } from '../components/principal/principal/principal.component';

export const appRoutes: Routes = [
  {
    path: 'Home',
    component: PrincipalComponent,
     data: {title: 'Bienvenido al sitio de Kayak'}
  },
  {
    path: 'Account',
    component: AccountComponent,
     data: {title: 'Acceder al sistema'}
  },
  {
    path: '',
    redirectTo: `/Home`,
    pathMatch: 'full',
  }
];
