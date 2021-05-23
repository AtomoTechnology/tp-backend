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
    // const headers = new HttpHeaders();
    // headers.append('Access-Control-Allow-Headers', 'Content-Type');
    // headers.append('Access-Control-Allow-Methods', 'GET');
    // headers.append('Access-Control-Allow-Origin', '*');

    debugger;
   return this.http.get<User[]>(`${this.urlBase}users`,
   {headers: new HttpHeaders({
     'Content-Type': 'application/x-www-form-urlencoded',
     'x-access-token': this.taskService.getJwtToken()})
   });
  }
  GetById(id){
    return this.http.get(`${this.urlBase}users?id=${id}`);
  }
  Post(role){
    return this.http.post(`${this.urlBase}users`,JSON.stringify(role));
  }
  Put(role){
    return this.http.put(`${this.urlBase}users?id=${role.id}`,JSON.stringify(role));
  }
  Delete(id){
    return this.http.delete(`${this.urlBase}users?id=${id}`);
  }
}
