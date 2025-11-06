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
  user_name: string;
  imageUrl: string;

  constructor() {
    this.id = 0;
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.user_name = '';
    this.imageUrl = '';
  }

    updateSettings() {
    this.first_name = ((document.getElementById("recipe-name") as HTMLInputElement).value);
    this.last_name = ((document.getElementById("recipe-description") as HTMLInputElement).value);
    this.user_name = ((document.getElementById("recipe-name") as HTMLInputElement).value);
    this.email = ((document.getElementById("recipe-name") as HTMLInputElement).value);
    this.imageUrl = ((document.getElementById("recipe-name") as HTMLInputElement).value);
    this.id = Date.now(); // Simple unique ID based on timestamp (not for production use! we will get IDs from user)
    // Logic to create a new recipe
    console.log('User Updated:', this);
    ((document.getElementById("recipe-name") as HTMLInputElement).value) = '';
    ((document.getElementById("recipe-description") as HTMLInputElement).value) = '';
    ((document.getElementById("recipe-name") as HTMLInputElement).value) = '';
    ((document.getElementById("recipe-description") as HTMLInputElement).value) = '';
    ((document.getElementById("recipe-name") as HTMLInputElement).value) = '';
  }
}
