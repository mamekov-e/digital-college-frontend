import { Injectable } from '@angular/core';

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";
const ROLE_KEY = "auth-role";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY)!);
  }

  public saveRole(role: string): void {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, role);
  }

  public getRole(): string {
    return sessionStorage.getItem(ROLE_KEY)!;
  }

  logout(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }
}
