import { Component } from '@angular/core';
import { Header } from "../../Components/bars/header/header";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Sidebar } from "../../Components/bars/sidebar/sidebar";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { DragNDropBox } from "../../Components/drag-n-drop-box/drag-n-drop-box";
import { UpdateButton } from "../../Components/buttons/update-button/update-button";
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  imports: [Header, MatCardModule, MatIconModule, MatToolbarModule, Sidebar, MatFormField, MatInputModule, MatLabel, MatButtonModule, DragNDropBox, UpdateButton],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {

  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_name: string;
  imageUrl: Blob;

  constructor(private userService: UserService, private AuthService: AuthService) {
    this.id = this.AuthService.userIdValue();
    this.first_name = this.AuthService.userFirstNameValue();
    this.last_name = this.AuthService.userLastNameValue();
    this.email = this.AuthService.userEmailValue();
    this.user_name = this.AuthService.userNameValue();
    this.password = this.AuthService.userPasswordValue();
    this.imageUrl = new Blob();
  }

    updateSettings() {
    this.first_name = ((document.getElementById("recipe-name") as HTMLInputElement).value);
    this.last_name = ((document.getElementById("recipe-description") as HTMLInputElement).value);
    this.user_name = ((document.getElementById("recipe-name") as HTMLInputElement).value);
    this.email = ((document.getElementById("recipe-name") as HTMLInputElement).value);

    this.userService.updateUser(this.id, {
      first_name: this.first_name,
      last_name: this.last_name,
      user_name: this.user_name,
      email: this.email,
      image_url: this.imageUrl,
      password: this.password
    }).subscribe(() => {
      console.log('User updated successfully');
    });
    // Logic to create a new recipe
    console.log('User Updated:', this);
    ((document.getElementById("recipe-name") as HTMLInputElement).value) = '';
    ((document.getElementById("recipe-description") as HTMLInputElement).value) = '';
    ((document.getElementById("recipe-name") as HTMLInputElement).value) = '';
    ((document.getElementById("recipe-description") as HTMLInputElement).value) = '';
    ((document.getElementById("recipe-name") as HTMLInputElement).value) = '';
  }
}
