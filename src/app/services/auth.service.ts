import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private loggedIn = false;
  private userId: number = -1; // user set to -1 when not logged in
  private currentUser: User | null = null;
  
  constructor() {}
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(user: User): void {
    this.loggedIn = true;
    if (user.user_id != undefined)(
      this.userId = Number(user.user_id)
    );
  }

  logout(): void {
    this.loggedIn = false;
    this.userId = -1;
  }

  userValue(): User | null {
    return this.currentUser;
  }

  userIdValue(): number {
    return this.userId;
  }
}
