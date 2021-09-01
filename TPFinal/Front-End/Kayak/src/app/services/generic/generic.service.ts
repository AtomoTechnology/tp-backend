import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TaskService } from '../auth/task.service';
import { IService } from '../../Interfaces/interface.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService implements IService<any, string> {

  private urlBase = environment.api_url;
  constructor(private http: HttpClient,
    private taskService: TaskService) { }

  GetAll(filter: string, ctrl: string): Observable<any[]> {
    debugger;
      return this.http.get<any[]>(`${this.urlBase + ctrl}`,
      {headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': this.taskService.getJwtToken()})
      });
  }

  GetById(id: number, ctrl: string): Observable<any> {
       return this.http.get<any>(`${this.urlBase + ctrl}/${id}`,
       {headers: new HttpHeaders({
         'Content-Type': 'application/x-www-form-urlencoded',
         'x-access-token': this.taskService.getJwtToken()})
       });
  }

  Post(model: any, ctrl: string) {
    debugger;
    return this.http.post(`${this.urlBase + ctrl}`,JSON.stringify(model),
    {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.taskService.getJwtToken()})
    });
  }

  Put(model: any, ctrl: string) {
    debugger;
    return this.http.put(`${this.urlBase + ctrl}/${model.id}`,JSON.stringify(model),
    {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.taskService.getJwtToken()})
    });
  }    

  Delete(id: any, ctrl: string) {
    return this.http.delete(`${this.urlBase + ctrl}/${id}`,
    {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.taskService.getJwtToken()})
    });
  }
}
