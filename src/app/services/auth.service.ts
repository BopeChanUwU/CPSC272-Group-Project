import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private loggedIn = false;
  private userId: number = -1; // user set to -1 when not logged in
  
  constructor() {}
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(userId: number): void {
    this.loggedIn = true;
    this.userId = userId; // set userId upon login
  }

  logout(): void {
    this.loggedIn = false;
    this.userId = -1;
  }

  userIdValue(): number {
    return this.userId;
  }
}
