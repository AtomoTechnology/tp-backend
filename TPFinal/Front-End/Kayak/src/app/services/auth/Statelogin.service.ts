import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import {TaskService} from '../../services/auth/task.service';

@Injectable({
  providedIn: 'root'
})
export class StateloginService implements CanActivate, CanLoad {

  constructor(private authService: TaskService, private router: Router) { }

  canActivate(){
    return this.canLoad();
  }
  canLoad() {
    debugger;
    if (!this.authService.loggedIn()) {
      this.router.navigate(['/Home']);
    }
    return this.authService.loggedIn();
  }
}
