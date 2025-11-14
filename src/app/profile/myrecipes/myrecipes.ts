import { Component, OnInit } from '@angular/core';
import { Sidebar } from "../../Components/bars/sidebar/sidebar";
import { Header } from "../../Components/bars/header/header";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Searchbar } from "../../Components/bars/searchbar/searchbar";
import { Recipecard } from "../../Components/cards/recipecard/recipecard";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RecipeService } from '../../services/recipe.service';
import { SavedRecipiesService } from '../../services/savedRecipies.service';

@Component({
  selector: 'app-myrecipes',
  imports: [Sidebar, Header, MatToolbarModule, Searchbar, Recipecard, CommonModule],
  templateUrl: './myrecipes.html',
  styleUrl: './myrecipes.css'
})
export class Myrecipes implements OnInit {
  recipes: any[] = [];

  constructor(
    private authService: AuthService, 
    private recipeService: RecipeService, 
    private savedRecipeService: SavedRecipiesService
  ) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.recipeService.getRecipesByAuthor(this.authService.userIdValue()).subscribe({
      next: (res: any[]) => {
        console.log('Raw recipes from backend:', res);
        
        // Map the backend data to the format expected by recipe cards
        this.recipes = res.map(recipe => {
          console.log('Processing recipe:', recipe.recipe_id, 'Image URL present:', !!recipe.image_url);
          
          return {
            recipe_id: recipe.recipe_id,
            recipeTitle: recipe.title,
            recipeDescription: recipe.description,
            creatorName: recipe.user_name || this.authService.userNameValue(),
            creatorProfilePic: '', 
            imgSrc: recipe.image_url || '', // This should be the base64 data URL from backend
            ingredients: recipe.ingredients || [],
            instructions: recipe.instructions || [],
            likesCount: 0,
            isLiked: false,
            isMyRecipe: true
          };
        });
        
        console.log('Processed recipes count:', this.recipes.length);
        console.log('First recipe imgSrc length:', this.recipes[0]?.imgSrc?.length);
      },
      error: (err) => {
        console.error('Error loading recipes:', err);
      }
    });
  }
}