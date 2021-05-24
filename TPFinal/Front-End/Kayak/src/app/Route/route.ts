import { Routes } from "@angular/router";
import { AccountComponent } from "../components/account/account/account.component";
import { ContentprincipalComponent } from "../components/menu/contentprincipal/contentprincipal.component";
import { PrincipalComponent } from "../components/principal/principal/principal.component";

export const appRoutes: Routes = [
  {
    path: 'Browse',
    component: ContentprincipalComponent,
     data: {title: 'Home'}
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
    path: 'User',
    loadChildren:() => import("../modules/user/user.module").then((p) => p.UserModule)
  },
  {
    path: 'ActionKayak',
    loadChildren:() => import("../modules/kayakaction/kayakaction.module").then((p) => p.KayakactionModule)
  },
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full',
  }
];
