import { Routes } from "@angular/router";
import { AccountComponent } from "../components/account/account/account.component";
import { ContentprincipalComponent } from "../components/menu/contentprincipal/contentprincipal.component";
import { UserComponent } from "../components/user/user.component";
import { AuthGuard } from "../guard/auth.guard";
import { RoleGuardGuard } from "../guard/role-guard.guard";

export const appRoutes: Routes = [
  {
    path: 'Browse',
    component: ContentprincipalComponent,
     data: {title: 'Home'}
  },
  {
    path: 'Account',
    component: AccountComponent,
     data: {title: 'Acceder al sistema'}
  },
  {
    path: 'User',
    component: UserComponent,
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
     data: {
      expectedRole: 'admin',
      title: 'Acción usuario'
    }
  },
  {
    path: '',
    redirectTo: `/Home`,
    pathMatch: 'full',
  }
];
