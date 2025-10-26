import { Component, input, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Navbar } from "../navbar/navbar";
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, Navbar, NgOptimizedImage, RouterLink, MatTooltip],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header { 

  title = input();

}
