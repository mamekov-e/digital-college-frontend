import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const ADMIN_API = "http://localhost:8080/api/admin";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllUsersUnchecked(): Observable<any> {
    return this.http.get(ADMIN_API + "get-all-unchecked");
  }

  getAllUsersAccepted(): Observable<any> {
    return this.http.get(ADMIN_API + "get-all-accepted");
  }

  getAllUsersDeclined(): Observable<any> {
    return this.http.get(ADMIN_API + "get-all-declined");
  }

  changeUserStatus(id: number, status: string): Observable<any> {
    return this.http.post(ADMIN_API + "change-status/"+ id + '/' + status, null);
  }
}
