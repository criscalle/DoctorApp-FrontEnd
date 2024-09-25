import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Medico } from '../interfaces/medico';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  
  baseUrl: string = environment.apiUrl + 'medico/';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  list() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

  create(Request : Medico): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.baseUrl}`, Request);
  }

  update(Request : Medico): Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${this.baseUrl}`, Request);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
  }
}
