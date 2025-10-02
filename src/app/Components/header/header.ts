import { Component, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule,MatMenuTrigger,MatIcon,MatMenu],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header { 
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  toggleMenu() {
    this.trigger.menuOpen ? this.trigger.closeMenu() : this.trigger.openMenu();
  }
}
