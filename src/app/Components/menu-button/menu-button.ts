import { Component, ViewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-menu-button',
  imports: [MatMenuTrigger, MatMenuModule, MatIcon, MatButtonModule, RouterLink],
  templateUrl: './menu-button.html',
  styleUrl: './menu-button.css'
})
export class MenuButton {

  @ViewChild("matMenu") trigger!: MatMenuTrigger;

    toggleMenu() {
      this.trigger.menuOpen ? this.trigger.closeMenu() : this.trigger.openMenu();
    }
}
