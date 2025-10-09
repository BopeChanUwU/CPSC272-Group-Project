import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-recipecard',
  imports: [MatCardModule, MatIcon],
  templateUrl: './recipecard.html',
  styleUrl: './recipecard.css'
})
export class Recipecard {

}
