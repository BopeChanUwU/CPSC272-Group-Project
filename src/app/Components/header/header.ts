import { Component, input, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuButton } from "../menu-button/menu-button";
import { Navbar } from "../navbar/navbar";
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MenuButton, Navbar, NgOptimizedImage, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header { 

  title = input();

}
