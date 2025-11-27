import { Component, OnInit } from '@angular/core';
import { Sidebar } from "../../Components/bars/sidebar/sidebar";
import { Header } from "../../Components/bars/header/header";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Searchbar } from "../../Components/bars/searchbar/searchbar";
import { Recipecard } from "../../Components/cards/recipecard/recipecard";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-myrecipes',
  imports: [Sidebar, Header, MatToolbarModule, Searchbar, Recipecard, CommonModule],
  templateUrl: './myrecipes.html',
  styleUrl: './myrecipes.css'
})
export class Myrecipes implements OnInit {
  recipes: any[] = [];
  isLoading: boolean = true;

  constructor(
    private authService: AuthService, 
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getRecipesByAuthor(this.authService.userIdValue()).subscribe({
      next: (res: any[]) => {
        console.log('Raw recipes from backend:', res);
        
        this.recipes = res.map(recipe => {
          console.log('Recipe:', recipe.recipe_id, 'Profile pic:', recipe.user_profile_pic ? 'Yes' : 'No');
          
          return {
            recipe_id: recipe.recipe_id,
            recipeTitle: recipe.title,
            recipeDescription: recipe.description,
            creatorName: recipe.user_name || this.authService.userNameValue(),
            // KEY FIX: Pass the user_profile_pic from backend
            creatorProfilePic: recipe.user_profile_pic || '',
            imgSrc: recipe.image_url || '',
            ingredients: recipe.ingredients || [],
            instructions: recipe.instructions || [],
            likesCount: 0,
            isLiked: false,
            isMyRecipe: true
          };
        });
        
        console.log('Processed recipes with profile pics:', this.recipes.length);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading recipes:', err);
        this.isLoading = false;
      }
    });
  }
}