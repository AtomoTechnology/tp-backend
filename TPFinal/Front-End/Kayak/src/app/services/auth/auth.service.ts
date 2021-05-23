import { Injectable } from '@angular/core';
import { TaskService } from '../../services/auth/task.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private statetoke:any;
  constructor(public auth: TaskService,
    public jwtHelper: JwtHelperService) { }

    public isAuthenticated(): boolean {
      let exp = this.jwtHelper.isTokenExpired(this.auth.getJwtToken());
      if(this.auth.getJwtToken()!= null && exp){
        this.statetoke = this.jwtHelper.isTokenExpired(this.auth.getJwtToken());
      }
      else{
        this.statetoke = exp;
      }
      return !this.statetoke;
    }
}
