import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PrincipalComponent
      },
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'Home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
