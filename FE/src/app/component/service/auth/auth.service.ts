import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../interface/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  API_URL: string = ' http://localhost:8000/api/auth';

  signup(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.API_URL + '/signup', user);
  }
  signin(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/signin`, user)
  }
  login(role: string) {
    if (role === "admin") {
      this.router.navigate(['/admin'])
    } else if (role === "member") {
      this.router.navigate(['/'])
    }
  }
  isAuthenticated(): any {
    return JSON.parse(localStorage.getItem('credential')!) || {};
  }
}
