import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: 'app-recipe-options-button',
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './recipe-options-button.html',
  styleUrl: './recipe-options-button.css'
})
export class RecipeOptionsButton {

}
