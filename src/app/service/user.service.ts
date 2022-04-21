import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const USER_API = "http://localhost:8080/api/user/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any> {
    return this.http.get(USER_API + id);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(USER_API + "get-current");
  }

  updateUser(user: any): Observable<any> {
    return this.http.post(USER_API + "update", user);
  }

  getAllUsersUnchecked(): Observable<any> {
    return this.http.get(USER_API + "get-all-unchecked");
  }

  getAllUsersAccepted(): Observable<any> {
    return this.http.get(USER_API + "get-all-accepted");
  }

  getAllUsersDeclined(): Observable<any> {
    return this.http.get(USER_API + "get-all-declined");
  }

  changeUserStatus(id: number, status: string): Observable<any> {
    return this.http.post(USER_API + "change-status/"+ id + '/' + status, null);
  }
}
