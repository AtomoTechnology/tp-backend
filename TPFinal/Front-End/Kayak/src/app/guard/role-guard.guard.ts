import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import decode from 'jwt-decode';
import { AuthService } from '../services/auth/auth.service';
import { TaskService } from '../services/auth/task.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

  constructor(public auth: TaskService, public router: Router,
    public autisAut:AuthService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.autisAut.isAuthenticated() || decode(this.auth.getJwtToken())['role'].toLowerCase() !== route.data.expectedRole) {
      this.router.navigate(['Home']);
      return false;
    }
    return true;
  }

}
