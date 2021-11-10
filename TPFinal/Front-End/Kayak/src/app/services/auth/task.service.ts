import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Tokens} from '../../classes/Tokens';
import { Auth } from '../../classes/auth';
import { tap, mapTo, catchError } from 'rxjs/operators';

import { Constant } from '../../classes/constant';
import decode from 'jwt-decode';
import { LoadscriptService } from '../loadScript/loadscript.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private urlBase = environment.api_url;

  constructor(private http: HttpClient, private loadscript: LoadscriptService) { }
  
  Authentication(auth:Auth): Observable<boolean>{
    this.doLogoutUser();
    return this.http.post<any>(`${this.urlBase}auth`, auth)
    .pipe(
      tap( tokens =>{
        if (tokens.status === 200) {
          this.doLoginUser(auth.userName, tokens)
        } else {
          throw tokens;
        }
      } ),
      mapTo(true),
      catchError(error => {
        throw error;
      })
    );
  }
  
  public GetIdUser() {
    return parseInt(this.loadscript.Decrypt(localStorage.getItem(Constant.idUser)));
  }

  loggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(Constant.JWT_TOKEN);
  }

  public Logout(){
    this.removeTokens();
    return true;
  }
  private removeTokens() {
    localStorage.removeItem(Constant.idUser);
    localStorage.removeItem(Constant.idRole);
    localStorage.removeItem(Constant.roleUser);
    localStorage.removeItem(Constant.JWT_TOKEN);
    localStorage.removeItem(Constant.loggedUser);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    localStorage.setItem(Constant.loggedUser, this.loadscript.Encrypt(username));
    this.storeTokens(tokens);
  }

  public doLogoutUser() {
    this.removeTokens();
  }
  public GetUserName() {
    return this.loadscript.Decrypt(localStorage.getItem(Constant.loggedUser));
  }
  public AccountId() {
    return parseInt(this.loadscript.Decrypt(localStorage.getItem(Constant.idaccount)));
  }

  public GetRole() {
    return this.loadscript.Decrypt(localStorage.getItem(Constant.roleUser));
  }

  private storeTokens(tokens: Tokens) {
    let decodotken = decode(tokens.token);
    localStorage.setItem(Constant.idUser, this.loadscript.Encrypt(decodotken['iduser']));
    localStorage.setItem(Constant.idRole, this.loadscript.Encrypt(decodotken['idRole']));
    localStorage.setItem(Constant.roleUser, this.loadscript.Encrypt(decodotken['role']));
    localStorage.setItem(Constant.idaccount, this.loadscript.Encrypt(decodotken['idaccount']));
    localStorage.setItem(Constant.JWT_TOKEN, tokens.token);

  }

}

