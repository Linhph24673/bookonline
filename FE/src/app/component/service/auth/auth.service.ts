import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../types/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<IUser[]>{
    return this.http.get<IUser[]>('http://localhost:8088/api/showUser')
  }

  getUserByEmail(user: IUser): Observable<any>{
    return this.http.post<any>('http://localhost:8088/api/getUserByEmail',user)
  }

  signIn(user: IUser): Observable<IUser[]>{
    return this.http.post<IUser[]>('http://localhost:8088/api/signIn', user)
  }

  signUp(user: IUser): Observable<IUser[]>{
    return this.http.post<IUser[]>('http://localhost:8088/api/signUp', user)
  }
}
