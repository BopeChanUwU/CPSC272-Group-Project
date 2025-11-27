import { Component, OnInit } from '@angular/core';
import { Header } from "../../Components/bars/header/header";
import { Sidebar } from "../../Components/bars/sidebar/sidebar";
import { Searchbar } from "../../Components/bars/searchbar/searchbar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { Recipecard } from "../../Components/cards/recipecard/recipecard";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { SavedRecipiesService } from '../../services/savedRecipies.service';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-savedrecipes',
  imports: [Header, Sidebar, Searchbar, MatToolbarModule, MatCardModule, Recipecard, MatIconModule, CommonModule],
  templateUrl: './savedrecipes.html',
  styleUrl: './savedrecipes.css'
})
export class Savedrecipes implements OnInit {
  recipes: any[] = [];
  isLoading: boolean = true;
  isMyRecipe: boolean = false;

  constructor(
    private savedRecipeService: SavedRecipiesService,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadSavedRecipes();
  }

  loadSavedRecipes() {
    const userId = this.authService.userIdValue();
    console.log('Loading saved recipes for user:', userId);

    // First, get the list of saved recipe IDs for this user
    this.savedRecipeService.getSavedByUser(userId).subscribe({
      next: (savedRecipes) => {
        console.log('Saved recipe IDs:', savedRecipes);

        if (savedRecipes.length === 0) {
          console.log('No saved recipes found');
          this.isLoading = false;
          return;
        }

        // Get all recipes from the database
        this.recipeService.getRecipes().subscribe({
          next: (allRecipes) => {
            console.log('All recipes:', allRecipes);

            // Filter to only include saved recipes
            const savedRecipeIds = savedRecipes.map(sr => sr.recipe_id);
            const filteredRecipes = allRecipes.filter(recipe => 
              savedRecipeIds.includes(recipe.recipe_id!)
            );

            console.log('Filtered saved recipes:', filteredRecipes);

            // Map to the format expected by recipe cards
            this.recipes = filteredRecipes.map(recipe => ({
              recipe_id: recipe.recipe_id,
              recipeTitle: recipe.title,
              recipeDescription: recipe.description,
              creatorName: recipe.user_name || 'Unknown',
              creatorProfilePic: '',
              imgSrc: recipe.image_url || '',
              ingredients: recipe.ingredients || [],
              instructions: recipe.instructions || [],
              likesCount: 0,
              isLiked: true, // They saved it, so it's liked
              isMyRecipe: false
            }));

            console.log('Processed recipes for display:', this.recipes.length);
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error loading all recipes:', err);
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error loading saved recipes:', err);
        this.isLoading = false;
      }
    });
  }
}