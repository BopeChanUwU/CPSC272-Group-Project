import { Component, input, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuButton } from "../menu-button/menu-button";
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIcon, MenuButton, Navbar],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header { 

  title = input();

}
