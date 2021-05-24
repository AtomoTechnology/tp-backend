import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KayakactionComponent } from 'src/app/components/kayakaction/kayakaction.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RoleGuardGuard } from 'src/app/guard/role-guard.guard';

const routes: Routes = [
  {
    path: '',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: KayakactionComponent,
    data: {
      expectedRole: 'admin',
      title: 'Acción kayak'
    }
  },
  {
    path: 'ActionKayak',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: KayakactionComponent,
    data: {
      expectedRole: 'admin',
      title: 'Acción kayak'
    }
  },
  {
    path: 'ActionKayak/:id',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: KayakactionComponent,
    data: {
      expectedRole: 'admin',
      title: 'Acción kayak'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KayakactionRoutingModule { }
