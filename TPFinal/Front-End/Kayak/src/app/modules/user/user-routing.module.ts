import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionuserComponent } from 'src/app/components/user/actionuser/actionuser.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RoleGuardGuard } from 'src/app/guard/role-guard.guard';

const routes: Routes = [
{
  path: '',
  component: UserComponent,
  canLoad: [AuthGuard],
  canActivate: [RoleGuardGuard],
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
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
