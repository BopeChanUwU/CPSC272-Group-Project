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
  private first_name: string = '';
  private last_name: string = '';
  private password: string = '';
  
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
    if (user.first_name){
      this.first_name = user.first_name;
    }
    if (user.last_name){
      this.last_name = user.last_name;
    }
    if (user.password){
      this.password = user.password;
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

  userFirstNameValue(): string {
    return this.first_name;
  }

  userLastNameValue(): string {
    return this.last_name;
  }

  userPasswordValue(): string {
    return this.password;
  }
}
