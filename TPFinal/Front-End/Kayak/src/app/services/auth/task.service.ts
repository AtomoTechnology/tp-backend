import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Tokens} from '../../classes/Tokens';
import { Auth } from '../../classes/auth';
import { tap, mapTo, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly RoleUser = 'RoleUser';
  private loggedUser: string;

  private urlBase = environment.api_url;

  constructor(private http: HttpClient) { }
  Authentication(auth:Auth): Observable<boolean>{
    debugger;
    this.doLogoutUser();
    return this.http.post<any>(`${this.urlBase}auth`, auth)
    .pipe(
      tap( tokens => this.doLoginUser(auth.userName, tokens)),
      mapTo(true),
      catchError(error => {
        return of(false)
      })
    );
  }

  loggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    debugger;
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }
  public Logout(){
    localStorage.removeItem(this.JWT_TOKEN)
    return true;
  }
  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.RoleUser);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    debugger;
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  public doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private storeTokens(tokens: Tokens) {
    debugger;
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
  }

}

