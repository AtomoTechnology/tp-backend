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

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    PrincipalComponent,
    UserComponent,
    ContentprincipalComponent
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(appRoutes,
      {
        relativeLinkResolution: 'legacy'
      }),
      BrowserAnimationsModule,HttpClientModule
  ],
  providers: [Title, {provide:JWT_OPTIONS, useValue:JWT_OPTIONS},JwtHelperService
  //    {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: TokenInterceptorService,
  //   multi: true
  // }
],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
