import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import {TaskService} from '../../services/auth/task.service';
import {throwError,BehaviorSubject, Observable} from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(public authService: TaskService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any>{
    if(this.authService.getJwtToken()){
      request = this.addToken(request, this.authService.getJwtToken());
    }

    return next.handle(request).pipe(catchError (error => {
      debugger;
      if(error instanceof HttpErrorResponse && error.statusText !== "Unauthorized" && error.status === 401){
        return this.handle401Error(request, next);
      }
      else{
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    debugger;
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    debugger;
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        return next.handle(this.addToken(request, jwt));
    }));
  }
}
