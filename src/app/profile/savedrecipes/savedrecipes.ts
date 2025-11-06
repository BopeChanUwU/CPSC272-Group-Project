import { Component } from '@angular/core';
import { Header } from "../../Components/header/header";
import { Sidebar } from "../../Components/sidebar/sidebar";
import { Searchbar } from "../../Components/searchbar/searchbar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { Recipecard } from "../../Components/recipecard/recipecard";
import { MatIconModule } from "@angular/material/icon";
import { DislikeButton } from "../../Components/dislike-button/dislike-button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-savedrecipes',
  imports: [Header, Sidebar, Searchbar, MatToolbarModule, MatCardModule, Recipecard, MatIconModule, DislikeButton, CommonModule],
  templateUrl: './savedrecipes.html',
  styleUrl: './savedrecipes.css'
})
export class Savedrecipes {
  recipes: any[] = [];

  ngOnInit() {
    // TODO: Replace this with actual service call to get user's recipes
    this.recipes = [
      {
        recipeTitle: 'Delicious Cake',
        recipeDescription: 'A simple and delicious cake recipe that is perfect for any occasion.',
        creatorName: 'John Doe',
        creatorProfilePic: 'https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=170667a&w=0&k=20&c=C0GFBgcEAPMXFFQBSK-rS2Omt9sUGImXfJE_8JOWC0M=',
        imgSrc: 'https://teakandthyme.com/wp-content/uploads/2024/05/jellycat-birthday-cake-DSC_9332-edit-1600.jpg',
        ingredients: ['1 cup of flour', '2 eggs', '1/2 cup of sugar', '1 tsp of baking powder'],
        instructions: ['Preheat the oven to 350°F (175°C).', 'In a bowl, mix the flour, sugar, and baking powder.'],
        likesCount: 120,
        isLiked: false
      },
      {
        recipeTitle: 'Chocolate Cookies',
        recipeDescription: 'Chewy chocolate chip cookies that everyone loves.',
        creatorName: 'Jane Smith',
        creatorProfilePic: 'https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=170667a&w=0&k=20&c=C0GFBgcEAPMXFFQBSK-rS2Omt9sUGImXfJE_8JOWC0M=',
        imgSrc: 'https://bluebowlrecipes.com/wp-content/uploads/2024/08/triple-chocolate-chunk-cookies-7189-500x500.jpg',
        ingredients: ['2 cups flour', '1 cup chocolate chips'],
        instructions: ['Mix ingredients', 'Bake at 375°F for 12 minutes'],
        likesCount: 85,
        isLiked: true
      }
    ];
  }
}
