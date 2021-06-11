import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentType } from '../../classes/document';
import { environment } from '../../../environments/environment';
import { TaskService } from '../auth/task.service';

@Injectable({
  providedIn: 'root'
})
export class DocumenttypeService {
  private urlBase = environment.api_url;
  constructor(private http: HttpClient,
    private taskService: TaskService) { }

  GetAll(): Observable<DocumentType[]> {
   
   return this.http.get<DocumentType[]>(`${this.urlBase}documenttypes`,
   {headers: new HttpHeaders({
     'Content-Type': 'application/x-www-form-urlencoded',
     'x-access-token': this.taskService.getJwtToken()})
   });
  }
  
  GetById(id){
    return this.http.get(`${this.urlBase}documenttypes?id=${id}`,
    {headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': this.taskService.getJwtToken()})
    });
  }

  Post(data){
    return this.http.post(`${this.urlBase}documenttypes`,JSON.stringify(data),
    {headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': this.taskService.getJwtToken()})
    });
  }

  Put(data){
    return this.http.put(`${this.urlBase}documenttypes?id=${data.id}`,JSON.stringify(data),
    {headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': this.taskService.getJwtToken()})
    });
  }

  Delete(id){
    return this.http.delete(`${this.urlBase}documenttypes?id=${id}`,
    {headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': this.taskService.getJwtToken()})
    });
  }
}
