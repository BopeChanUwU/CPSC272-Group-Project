import { Component, ViewChild, OnInit } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [Header, MatCardModule, MatIconModule, MatToolbarModule, Sidebar, MatFormField, MatInputModule, MatLabel, MatButtonModule, DragNDropBox, UpdateButton, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings implements OnInit {
  @ViewChild(DragNDropBox) dragDropComponent!: DragNDropBox;

  id: number;
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  password: string = '';
  user_name: string = '';
  imageBlob: Blob | null = null;

  constructor(
    private userService: UserService, 
    private authService: AuthService,
    private router: Router
  ) {
    this.id = this.authService.userIdValue();
  }

  ngOnInit() {
    // Load current user data
    this.user_name = this.authService.userNameValue();
    this.first_name = this.authService.userFirstNameValue();
    this.last_name = this.authService.userLastNameValue();
    this.email = this.authService.userEmailValue();
    this.password = this.authService.userPasswordValue();
  }

  onFileSelected(blob: Blob): void {
    this.imageBlob = blob;
    console.log('Image blob received:', blob.size, 'bytes', blob.type);
  }

  async updateSettings() {
    console.log('Updating user settings for user ID:', this.id);
    
    // Validate required fields
    if (!this.user_name || !this.first_name || !this.last_name || !this.email) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate user ID
    if (!this.id || this.id <= 0) {
      alert('Error: Invalid user ID. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }

    // Convert Blob to Base64 if image exists
    let imageBase64 = null;
    if (this.imageBlob && this.imageBlob.size > 0) {
      imageBase64 = await this.blobToBase64(this.imageBlob);
      console.log('New image will be uploaded');
    } else {
      console.log('No new image, keeping existing');
    }

    const updatedUser: any = {
      user_name: this.user_name,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      image_url: imageBase64
    };

    console.log('Calling updateUser with ID:', this.id);
    console.log('Update payload:', {
      ...updatedUser,
      password: '***',
      image_url: imageBase64 ? 'base64 data present' : 'null'
    });

    this.userService.updateUser(this.id, updatedUser).subscribe({
      next: (res) => {
        console.log('User updated successfully:', res);
        
        // Update the auth service with new values
        this.authService.login(res);
        
        alert('Settings updated successfully!');
        this.router.navigate(['/my_recipes']);
      },
      error: (err) => {
        console.error('Error updating user:', err);
        alert('Error updating settings. Please try again.');
      }
    });
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}