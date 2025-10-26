import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements User{
  id?: number | undefined;
  user_name?: string | undefined;
  first_name?: string | undefined;
  last_name?: string | undefined;
  email: string = '';
  password: string = '';
  imageUrl?: string | undefined;

  signIn(){
    this.email = ((document.getElementById("email") as HTMLInputElement).value);
    this.password = ((document.getElementById("pswd") as HTMLInputElement).value);
    // Logic to create a new recipe
    console.log('User Signed In:', this);
    ((document.getElementById("email") as HTMLInputElement).value) = '';
    ((document.getElementById("pswd") as HTMLInputElement).value) = '';
  }

  signUp(){
    this.user_name = ((document.getElementById("text") as HTMLInputElement).value);
    this.email = ((document.getElementById("email") as HTMLInputElement).value);
    this.password = ((document.getElementById("pswd") as HTMLInputElement).value);
    // Logic to create a new recipe
    console.log('User Created:', this);
    ((document.getElementById("text") as HTMLInputElement).value) = '';
    ((document.getElementById("email") as HTMLInputElement).value) = '';
    ((document.getElementById("pswd") as HTMLInputElement).value) = '';
  }
}
