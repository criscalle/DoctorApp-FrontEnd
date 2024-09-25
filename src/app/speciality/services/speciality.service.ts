import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { Speciality } from '../interfaces/speciality';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  baseUrl: string = environment.apiUrl + 'Speciality/';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  list() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

  listActivos() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}ListadoActivos`)
  }

  create(Request : Speciality): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.baseUrl}`, Request);
  }

  update(Request : Speciality): Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${this.baseUrl}`, Request);
  }

  delete(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.baseUrl}${id}`);
  }
}
