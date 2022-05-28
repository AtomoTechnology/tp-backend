import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RoleGuardGuard } from 'src/app/guard/role-guard.guard';
import { ListComponent } from '../user/list/list.component';
import { ActionuserComponent } from './actionuser/actionuser.component';

const routes: Routes = [
  {
    path: '',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ListComponent,
    data: {
      expectedRole: 'admin',
      title: 'Lista de usuario'
    }
  },
  {
    path: 'ActionUser',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionuserComponent,
    data: {
      expectedRole: 'admin',
      title: 'Accion usuario'
      }
  },
  {
    path: 'ActionUser/:id',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionuserComponent,
    data: {
      expectedRole: 'admin',
      title: 'Accion usuario'
      }
  },
  {
    path: '',
    redirectTo: '/User',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/User',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
