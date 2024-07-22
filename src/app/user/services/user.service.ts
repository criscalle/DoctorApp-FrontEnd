import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { Session } from '../interfaces/session';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiUrl + 'User/';

  constructor(private http: HttpClient) { }

  iniciarsesion(request: Login):Observable<Session> 
  { return this.http.post<Session>(`${this.baseUrl}Login`, request);

  }

}
