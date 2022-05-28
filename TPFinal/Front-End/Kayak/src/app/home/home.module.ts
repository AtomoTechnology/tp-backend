import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { PrimeNgModule } from '../specialmodule/primeng';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,PrimeNgModule,ReactiveFormsModule,
    HomeRoutingModule
  ],
  exports:[
    HomeRoutingModule
  ]
})
export class HomeModule { }
