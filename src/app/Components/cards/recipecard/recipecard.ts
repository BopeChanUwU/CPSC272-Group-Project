import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { RecipeOptionsButton } from '../../buttons/recipe-options-button/recipe-options-button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipecard',
  imports: [MatCardModule, RecipeOptionsButton, CommonModule],
  templateUrl: './recipecard.html',
  styleUrl: './recipecard.css'
})
export class Recipecard implements OnInit {
  @Input() recipe_id: number = 0;
  @Input() ingredients: string[] = [];
  @Input() instructions: string[] = [];
  @Input() recipeTitle: string = '';
  @Input() recipeDescription: string = '';
  @Input() creatorName: string = '';
  @Input() creatorProfilePic: string = '';
  @Input() likesCount: number = 0;
  @Input() imgSrc: string = '';
  @Input() isLiked: boolean = false;
  @Input() isMyRecipe: boolean = false;
  
  defaultPic: string = 'https://www.shutterstock.com/image-vector/image-not-found-failure-network-260nw-2330163829.jpg';
  displayImageSrc: string = '';

  ngOnInit() {
    // Handle image source - if it's a data URL, use it directly
    if (this.imgSrc && this.imgSrc.startsWith('data:image')) {
      this.displayImageSrc = this.imgSrc;
    } else if (this.imgSrc) {
      // If it's a regular URL
      this.displayImageSrc = this.imgSrc;
    } else {
      // Use default image
      this.displayImageSrc = this.defaultPic;
    }
  }

  onImageError() {
    // Fallback to default image on error
    this.displayImageSrc = this.defaultPic;
  }
}