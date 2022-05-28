import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HangerRoutingModule } from './hanger-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { PrimeNgModule } from 'src/app/specialmodule/primeng';
import { ActionhangerComponent } from '../../components/hanger/actionhanger/actionhanger.component';
import { HangerComponent } from '../../components/hanger/hanger.component';


@NgModule({
  declarations: [
    ActionhangerComponent
  ],
  imports: [
    CommonModule,SharedModule,PrimeNgModule,
    ReactiveFormsModule,
    HangerRoutingModule
  ],
  exports:[
    HangerRoutingModule
  ]
})
export class HangerModule { }
