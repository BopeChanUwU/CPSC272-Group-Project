import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [MatIcon, MatButtonModule, MatTooltip, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

}
