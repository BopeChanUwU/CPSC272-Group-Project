import { Component, signal, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuButton } from "../menu-button/menu-button";
import { Navbar } from "../navbar/navbar";
import { Searchbar } from "../searchbar/searchbar";

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MenuButton, Navbar, Searchbar],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header { 

  protected readonly title = signal('PotLuck');

}
