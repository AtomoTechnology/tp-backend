import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { ActionuserComponent } from './actionuser/actionuser.component';
import { ProfileComponent } from './profile/profile.component';
import { PrimeNgModule } from 'src/app/specialmodule/primeng';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ActionuserComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,PrimeNgModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  exports:[
    UserRoutingModule
  ]
})
export class UserModule { }
