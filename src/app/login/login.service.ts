import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl  = environment.apiUrl;
  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  login(loginData: { email: string, password: string  }): Observable<any> {
    console.log(loginData);
    return this.http.post(`${this.apiUrl}/users/login`, loginData);
  }

  register(registerData: { email: string, password: string,confirmPassword:string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, registerData);
  }

  profile(id:number): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/users/profile?id=${id}`,{headers});
  }



}
