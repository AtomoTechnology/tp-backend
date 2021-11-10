import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AccountComponent } from './components/account/account/account.component';
import { JwtHelperService,  JWT_OPTIONS  } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { appRoutes } from './Route/route';

import { AuthGuard } from './guard/auth.guard';
import { StateloginService } from './services/auth/Statelogin.service';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';

import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


// Module
import { PrincipalComponent } from './components/principal/principal/principal.component';
import { ContentprincipalModule } from './modules/contentprincipal/contentprincipal.module';
import { ChangepasswordComponent } from './components/account/changepassword/changepassword.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { ActionlocationComponent } from './components/location/actionlocation/actionlocation.component';
import { ActionhangerComponent } from './components/hanger/actionhanger/actionhanger.component';
import { KayakComponent } from './components/kayaks/kayak/kayak.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    PrincipalComponent,
    ChangepasswordComponent,
    PerfilComponent,
    ActionlocationComponent,
    ActionhangerComponent,
    KayakComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule, 
    RouterModule.forRoot(appRoutes,
      {
        relativeLinkResolution: 'legacy'
      }),HttpClientModule,
      MessagesModule,ContentprincipalModule,
      ConfirmDialogModule,
  ],
  providers: [Title, {provide:JWT_OPTIONS, useValue:JWT_OPTIONS},JwtHelperService,AuthGuard,StateloginService,
    {
   provide: HTTP_INTERCEPTORS,
   useClass: TokenInterceptorService,
   multi: true
 }
],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
