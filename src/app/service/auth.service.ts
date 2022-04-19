import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = "http://localhost:8080/api/auth/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(user: { email: any; password: any; }): Observable<any> {
    return this.http.post(AUTH_API + "signin", {
      email: user.email,
      password: user.password
    });
  }

  public register(user: { firstName: any; lastName: any; middleName: any; phoneNumber: any; email: any; password: any; }): Observable<any> {
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
