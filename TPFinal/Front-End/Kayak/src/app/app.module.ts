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
import { ApiController } from './apicontroller/api.controller';


// Module
import { PrincipalComponent } from './components/principal/principal/principal.component';
import { ContentprincipalModule } from './modules/contentprincipal/contentprincipal.module';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    PrincipalComponent
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
