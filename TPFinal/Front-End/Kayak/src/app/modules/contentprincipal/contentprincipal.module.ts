import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentprincipalRoutingModule } from './contentprincipal-routing.module';
import { KayakactionComponent } from 'src/app/components/kayakaction/kayakaction.component';
import { ContentprincipalComponent } from 'src/app/components/menu/contentprincipal/contentprincipal.component';
import { ActionparcheComponent } from 'src/app/components/parche/actionparche/actionparche.component';
import { ParcheComponent } from 'src/app/components/parche/parche.component';
import { PartnerComponent } from 'src/app/components/partner/partner.component';
import { ActionuserComponent } from 'src/app/components/user/actionuser/actionuser.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [    
    ContentprincipalComponent,
    KayakactionComponent,
    UserComponent,
    ActionuserComponent,
    ParcheComponent,
    ActionparcheComponent,
    PartnerComponent
  ],
  imports: [
    CommonModule,
    ContentprincipalRoutingModule,ReactiveFormsModule,FormsModule,
    SharedModule,TableModule,AccordionModule,ButtonModule,ToastrModule.forRoot({
      progressBar: true,
      timeOut: 5000,
      enableHtml: true,
      preventDuplicates: true,
      progressAnimation:'increasing'
    }),TooltipModule,BrowserAnimationsModule

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ContentprincipalModule { }
