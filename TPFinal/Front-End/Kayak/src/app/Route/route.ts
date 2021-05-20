import { Routes } from "@angular/router";
import { AccountComponent } from "../components/account/account/account.component";

export const appRoutes: Routes = [
  {
    path: 'Account',
    component: AccountComponent,
     data: {title: 'Acceder al sistema'}
  },
  {
    path: '',
    redirectTo: `/Account`,
    pathMatch: 'full',
  }
];
