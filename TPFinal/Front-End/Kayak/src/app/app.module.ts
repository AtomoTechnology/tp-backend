import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AccountComponent } from './components/account/account/account.component';
import { JwtHelperService,  JWT_OPTIONS  } from '@auth0/angular-jwt';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { appRoutes } from './Route/route';
import { HeaderComponent } from './components/menu/header/header.component';
import { NavbarComponent } from './components/menu/navbar/navbar.component';
import { FooterComponent } from './components/menu/footer/footer.component';
import { PrincipalComponent } from './components/principal/principal/principal.component';
import { UserComponent } from './components/user/user.component';
import { ContentprincipalComponent } from './components/menu/contentprincipal/contentprincipal.component';

import { AuthGuard } from './guard/auth.guard';
import { StateloginService } from './services/auth/Statelogin.service';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';

import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ActionuserComponent } from './components/user/actionuser/actionuser.component';
import { KayakactionComponent } from './components/kayakaction/kayakaction.component';
import { ParcheComponent } from './components/parche/parche.component';
import { ActionparcheComponent } from './components/parche/actionparche/actionparche.component';

// Module
import { UserModule } from './modules/user/user.module';
@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    PrincipalComponent,
    UserComponent,
    ContentprincipalComponent,
    ActionuserComponent,
    KayakactionComponent,
    ParcheComponent,
    ActionparcheComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,
      {
        relativeLinkResolution: 'legacy'
      }),TableModule,AccordionModule,ButtonModule,
      BrowserAnimationsModule,HttpClientModule,
      MessagesModule,UserModule,
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
