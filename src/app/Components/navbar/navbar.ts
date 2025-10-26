import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-navbar',
  imports: [MatIcon, MatButtonModule, MatTooltip],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

}
