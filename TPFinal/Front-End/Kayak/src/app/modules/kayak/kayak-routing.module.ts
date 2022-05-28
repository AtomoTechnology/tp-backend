import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KayakactionComponent } from 'src/app/components/kayakaction/kayakaction.component';
import { KayaktypeComponent } from 'src/app/components/kayaks/kayaktype/kayaktype.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RoleGuardGuard } from 'src/app/guard/role-guard.guard';
import { ActionkayaktypeComponent } from '../../components/kayaks/kayaktype/actionkayaktype/actionkayaktype.component';

const routes: Routes = [
  
  {
    path: 'KayakType',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: KayaktypeComponent,
    data: {
      expectedRole: 'admin',
      title: 'TIpo de kayak'
    }
  },
  {
    path: 'Actionkayaktype',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionkayaktypeComponent,
    data: {
      expectedRole: 'admin',
      title: 'Accion usuario'
      }
  },
  {
    path: 'Actionkayaktype/:id',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionkayaktypeComponent,
    data: {
      expectedRole: 'admin',
      title: 'Accion usuario'
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KayakRoutingModule { }
