import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = "http://localhst:8080/api/auth/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(user: any): Observable<any> {
    return this.http.post(AUTH_API + "signin", {
      email: user.email,
      password: user.password
    });
  }

  public register(user: any): Observable<any> {
    return this.http.post(AUTH_API + "signup", {
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password
    })
  }


}
