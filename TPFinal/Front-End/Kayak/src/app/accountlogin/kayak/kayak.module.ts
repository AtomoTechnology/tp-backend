import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KayakRoutingModule } from './kayak-routing.module';
import { ListComponent } from './list/list.component';
import { ActionkayakComponent } from './actionkayak/actionkayak.component';
import { TypelistComponent } from './typelist/typelist.component';
import { ActiontypeComponent } from './actiontype/actiontype.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeNgModule } from 'src/app/specialmodule/primeng';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ActionkayakComponent,
    TypelistComponent,
    ActiontypeComponent
  ],
  imports: [
    CommonModule,SharedModule,PrimeNgModule,
    ReactiveFormsModule,
    KayakRoutingModule
  ],
  exports:[
    KayakRoutingModule
  ]
})
export class KayakModule { }
