import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { Session } from '../interfaces/session';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { Registro } from '../interfaces/registro';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiUrl + 'User/';

  constructor(private http: HttpClient) { }

  iniciarsesion(request: Login):Observable<Session> 
  { return this.http.post<Session>(`${this.baseUrl}Login`, request);

  }

  list(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

  registrar(request: Registro): Observable<Session>{
    return this.http.post<Session>(`${this.baseUrl}registro`, request);
  }

  listRoles(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}ListadoRoles`);
  }

  delete(username: string){
    return this.http.delete<ApiResponse>(`${this.baseUrl}${username}`);
  }

}
