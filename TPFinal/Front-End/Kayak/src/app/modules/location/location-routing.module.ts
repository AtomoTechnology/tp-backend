import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { RoleGuardGuard } from 'src/app/guard/role-guard.guard';
import { LocationComponent } from 'src/app/location/location.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
