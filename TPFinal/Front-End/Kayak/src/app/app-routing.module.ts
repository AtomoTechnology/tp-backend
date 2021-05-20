import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account/account.component';

const routes: Routes = [
  {
    path: 'Account',
    component: AccountComponent,
     data: {title: 'Acceder al sistema'}
  },
  {
    path: '',
    redirectTo: `/Account`,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
