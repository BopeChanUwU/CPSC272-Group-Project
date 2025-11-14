import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private loggedIn = false;
  private userId: number = -1; // user set to -1 when not logged in
  private user_name: string = '';
  private email: string = '';
  
  constructor() {}

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(user: User): void {
    this.loggedIn = true;
    if (user.user_id != undefined)(
      this.userId = Number(user.user_id)
    );
    if (user.user_name){
      this.user_name = user.user_name;
    }
    if (user.email){
      this.email = user.email;
    }
  }

  logout(): void {
    this.loggedIn = false;
    this.userId = -1;
  }

  userNameValue(): string {
    return this.user_name;
  }

  userEmailValue(): string {
    return this.email;
  }

  userIdValue(): number {
    return this.userId;
  }
}
