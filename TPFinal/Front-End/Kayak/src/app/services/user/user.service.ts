import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../classes/user.class';
import { environment } from '../../../environments/environment';
import { TaskService } from '../auth/task.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBase = environment.api_url;
  constructor(private http: HttpClient,
    private taskService: TaskService) { }

  GetAll(): Observable<User[]> {
   return this.http.get<User[]>(`${this.urlBase}users`,
   {headers: new HttpHeaders({
     'Content-Type': 'application/x-www-form-urlencoded',
     'x-access-token': this.taskService.getJwtToken()})
   });
  }
  GetById(id){
    return this.http.get(`${this.urlBase}users/${id}`,
    {headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': this.taskService.getJwtToken()})
    });
  }
  Post(data){
    debugger;
    return this.http.post(`${this.urlBase}users`,JSON.stringify(data),
    {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.taskService.getJwtToken()})
    });
  }
  Put(data){
    return this.http.put(`${this.urlBase}users/${data.id}`,JSON.stringify(data),
    {headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': this.taskService.getJwtToken()})
    });
  }
  Delete(id){
    return this.http.delete(`${this.urlBase}users/${id}`,
    {headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': this.taskService.getJwtToken()})
    });
  }
}
