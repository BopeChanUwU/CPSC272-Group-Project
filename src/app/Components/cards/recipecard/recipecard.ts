import { Component, Input } from '@angular/core';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-recipecard',
  imports: [MatCardModule],
  templateUrl: './recipecard.html',
  styleUrl: './recipecard.css'
})
export class Recipecard {
  @Input() ingredients: string[] = [];
  @Input() instructions: string[] = [];
  @Input() recipeTitle: string = '';
  @Input() recipeDescription: string = '';
  @Input() creatorName: string = '';
  @Input() creatorProfilePic: string = '';
  @Input() likesCount: number = 0;
  @Input() imgSrc: string = '';
  @Input() isLiked: boolean = false;
}
