import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
// import { AccountComponent } from './components/account/account/account.component';
import { JwtHelperService,  JWT_OPTIONS  } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { appRoutes } from './Route/route';

import { AuthGuard } from './guard/auth.guard';
import { StateloginService } from './services/auth/Statelogin.service';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContentprincipalModule } from './modules/contentprincipal/contentprincipal.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { AccountloginModule } from './accountlogin/accountlogin.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes,
      {
        relativeLinkResolution: 'legacy'
      }),HttpClientModule,ContentprincipalModule,SharedModule
  ],
  providers: [Title, {provide:JWT_OPTIONS, useValue:JWT_OPTIONS},JwtHelperService,
    {
   provide: HTTP_INTERCEPTORS,
   useClass: TokenInterceptorService,
   multi: true
 },
],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
