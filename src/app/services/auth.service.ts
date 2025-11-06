import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loggedIn = false;
  private userId: number | null= null;
  
  constructor() {}
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(): void {
    this.loggedIn = true;
    this.userId = 1; // example user ID
  }

  logout(): void {
    this.loggedIn = false;
    this.userId = null;
  }
}
