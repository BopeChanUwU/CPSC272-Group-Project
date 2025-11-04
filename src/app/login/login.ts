import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { catchError, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  // Form data for login and registration
  user: User = {
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    image_url: ''
  };

  message = ''; // Feedback message to show success/error

  constructor(private userService: UserService,  private router: Router) {}

  // -------------------- LOGIN --------------------
  login() {
    if (!this.user.email || !this.user.password) {
      this.message = 'Please enter email and password.';
      return;
    }

    this.userService.login(this.user.email, this.user.password)
      .pipe(
        catchError(err => {
          console.error(err);
          this.message = 'Invalid email or password.';
          return of(null);
        })
      )
      .subscribe(res => {
        if (res) {
          this.message = `Welcome!`;
          console.log('User logged in:', res);

          // ✅ Navigate to home page after successful login
          this.router.navigate(['/home']);
        }
      });
  }

  // -------------------- REGISTER --------------------
  register() {
    if (!this.user.email || !this.user.password || !this.user.user_name || !this.user.first_name || !this.user.last_name) {
      this.message = 'Please fill in all required fields.';
      return;
    }

    this.userService.addUser(this.user)
      .pipe(
        catchError(err => {
          console.error(err);
          this.message = 'Error creating user.';
          return of(null);
        })
      )
      .subscribe(res => {
        if (res) {
          this.message = `User ${res.user_name} created successfully!`;
          console.log('New user:', res);
        }
      });
  }
}
