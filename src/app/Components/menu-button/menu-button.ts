import { Component, ViewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from "@angular/router";
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  selector: 'app-menu-button',
  imports: [MatMenuModule, MatButtonModule, RouterLink, MatTooltip],
  templateUrl: './menu-button.html',
  styleUrl: './menu-button.css'
})
export class MenuButton {

  @ViewChild("matMenu") trigger!: MatMenuTrigger;

    toggleMenu() {
      this.trigger.menuOpen ? this.trigger.closeMenu() : this.trigger.openMenu();
    }
}
