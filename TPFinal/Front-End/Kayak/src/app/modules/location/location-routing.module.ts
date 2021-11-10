import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionlocationComponent } from 'src/app/components/location/actionlocation/actionlocation.component';
import { LocationComponent } from 'src/app/components/location/location.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RoleGuardGuard } from 'src/app/guard/role-guard.guard';

const routes: Routes = [
  {
    path: '',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: LocationComponent,
    data: {
      expectedRole: 'admin',
      title: 'Ubicacion Kayak'
    }
  },
  {
    path: 'ActionLocation',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionlocationComponent,
    data: {
      expectedRole: 'admin',
      title: 'Crear ubicacion'
      }
  },
  {
    path: 'ActionLocation/:id',
    canLoad: [AuthGuard],
    canActivate: [RoleGuardGuard],
    component: ActionlocationComponent,
    data: {
      expectedRole: 'admin',
      title: 'Actulizar ubicacion'
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
