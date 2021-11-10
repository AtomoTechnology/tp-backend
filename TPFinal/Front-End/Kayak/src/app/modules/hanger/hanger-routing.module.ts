import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionhangerComponent } from 'src/app/components/hanger/actionhanger/actionhanger.component';
import { HangerComponent } from 'src/app/components/hanger/hanger.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RoleGuardGuard } from 'src/app/guard/role-guard.guard';

const routes: Routes = [
  {
    path: '',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: HangerComponent,
    data: {
      expectedRole: 'admin',
      title: 'Lista parche'
    }
  },
  {
    path: 'ActionHanger',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionhangerComponent,
    data: {
      expectedRole: 'admin',
      title: 'Crear parche'
      }
  },
  {
    path: 'ActionHanger/:id',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionhangerComponent,
    data: {
      expectedRole: 'admin',
      title: 'Actulizar parche'
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HangerRoutingModule { }
