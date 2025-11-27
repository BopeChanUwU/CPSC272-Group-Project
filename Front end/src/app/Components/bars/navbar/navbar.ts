import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, Router } from "@angular/router";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [MatIcon, MatButtonModule, MatTooltip, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
