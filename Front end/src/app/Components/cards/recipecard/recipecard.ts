// recipecard.ts - Updated component
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
  @Input() creatorProfilePic: string = ''; // This should receive the profile picture
  @Input() likesCount: number = 0;
  @Input() imgSrc: string = '';
  @Input() isLiked: boolean = false;
  @Input() isMyRecipe: boolean = false;
  
  defaultPic: string = 'https://www.shutterstock.com/image-vector/image-not-found-failure-network-260nw-2330163829.jpg';
  defaultProfilePic: string = 'https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=170667a&w=0&k=20&c=C0GFBgcEAPMXFFQBSK-rS2Omt9sUGImXfJE_8JOWC0M=';
  displayImageSrc: string = '';
  displayProfilePic: string = '';

  ngOnInit() {
    // Handle recipe image
    if (this.imgSrc && this.imgSrc.startsWith('data:image')) {
      this.displayImageSrc = this.imgSrc;
    } else if (this.imgSrc) {
      this.displayImageSrc = this.imgSrc;
    } else {
      this.displayImageSrc = this.defaultPic;
    }

    // Handle profile picture - THIS IS THE KEY FIX
    if (this.creatorProfilePic && this.creatorProfilePic.startsWith('data:image')) {
      this.displayProfilePic = this.creatorProfilePic;
    } else if (this.creatorProfilePic) {
      this.displayProfilePic = this.creatorProfilePic;
    } else {
      this.displayProfilePic = this.defaultProfilePic;
    }
  }

  onImageError() {
    this.displayImageSrc = this.defaultPic;
  }

  onProfilePicError() {
    this.displayProfilePic = this.defaultProfilePic;
  }
}