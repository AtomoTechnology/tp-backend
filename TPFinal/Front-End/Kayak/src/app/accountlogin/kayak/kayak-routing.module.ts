import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RoleGuardGuard } from 'src/app/guard/role-guard.guard';
import { ActionkayakComponent } from './actionkayak/actionkayak.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ListComponent,
    data: {
      expectedRole: 'admin',
      title: 'TIpo de kayak'
    }
  },
  {
    path: 'Actionkayak',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionkayakComponent,
    data: {
      expectedRole: 'admin',
      title: 'Accion usuario'
      }
  },
  {
    path: 'Actionkayak/:id',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionkayakComponent,
    data: {
      expectedRole: 'admin',
      title: 'Accion usuario'
      }
  },
  {
    path: '',
    redirectTo: '/Kayak',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/Kayak',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KayakRoutingModule { }
