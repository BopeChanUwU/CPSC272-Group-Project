import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-recipecard',
  imports: [MatCardModule, MatIcon, MatButton],
  templateUrl: './recipecard.html',
  styleUrl: './recipecard.css'
})
export class Recipecard {

}
