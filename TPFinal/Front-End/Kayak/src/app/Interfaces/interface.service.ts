import { Observable } from "rxjs/internal/Observable";

export interface IService<T, controller> {
    GetAll(filter:string, ctrl:controller): Observable<T[]>;
    GetById(id: number, ctrl:controller): Observable<T>;
    Post(model:T, ctrl:controller);
    Put(model:T , ctrl:controller);
    Delete(id, ctrl:controller);
}