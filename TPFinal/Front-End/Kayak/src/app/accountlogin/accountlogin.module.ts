import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountloginRoutingModule } from './accountlogin-routing.module';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { KayakRoutingModule } from './kayak/kayak-routing.module';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    AccountloginRoutingModule,
    SharedModule,KayakRoutingModule
  ],
  exports:[
    AccountloginRoutingModule,    
    MenuComponent
  ]
})
export class AccountloginModule { }
