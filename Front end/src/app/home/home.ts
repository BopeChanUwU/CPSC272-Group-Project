import { Component, signal, ChangeDetectionStrategy, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Header } from "../Components/bars/header/header";
import { LikeButton } from "../Components/buttons/like-button/like-button";
import { SkipButton } from "../Components/buttons/skip-button/skip-button";
import { HomeCard } from "../Components/cards/home-card/home-card";
import { RecipeService } from '../services/recipe.service';
import { SavedRecipiesService } from '../services/savedRecipies.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatToolbarModule, Header, LikeButton, SkipButton, HomeCard, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements OnInit {
  @ViewChild(HomeCard) homeCard!: HomeCard;
  
  isLiked = signal(false);
  isSkipped = signal(false);
  isLocked = signal(false);
  resetAnimation = signal(false);
  
  availableRecipes: any[] = [];
  currentRecipeIndex = signal(0);
  currentRecipe = signal<any>(null);
  noMoreRecipes = signal(false);
  isLoading = signal(true);

  constructor(
    private recipeService: RecipeService,
    private savedRecipeService: SavedRecipiesService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('Home component initialized');
    this.loadRecipes();
  }

  loadRecipes() {
    console.log('Loading recipes for user:', this.authService.userIdValue());
    
    this.recipeService.getRecipesExceptAuthor(this.authService.userIdValue()).subscribe({
      next: (recipes) => {
        console.log('Loaded recipes from backend (excluding current user):', recipes);
        console.log('Number of recipes:', recipes.length);
        
        if (recipes && recipes.length > 0) {
          this.availableRecipes = this.shuffleArray(recipes);
          console.log('Shuffled recipes:', this.availableRecipes);
          
          this.isLoading.set(false);
          this.cdr.markForCheck();
          
          setTimeout(() => {
            this.displayCurrentRecipe();
          }, 100);
        } else {
          console.log('No recipes available from backend');
          this.isLoading.set(false);
          this.noMoreRecipes.set(true);
          this.cdr.markForCheck();
        }
      },
      error: (err) => {
        console.error('Error loading recipes:', err);
        this.isLoading.set(false);
        this.noMoreRecipes.set(true);
        this.cdr.markForCheck();
      }
    });
  }

  shuffleArray(array: any[]): any[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  displayCurrentRecipe() {
    const index = this.currentRecipeIndex();
  
    console.log('displayCurrentRecipe called, index:', index, 'total recipes:', this.availableRecipes.length);
  
    if (index >= this.availableRecipes.length) {
      this.noMoreRecipes.set(true);
      console.log('No more recipes to display - reached end');
      this.cdr.markForCheck();
      return;
    }
  
    const recipe = this.availableRecipes[index];
    console.log('Displaying recipe:', recipe);
    this.currentRecipe.set(recipe);
    this.cdr.markForCheck();
  }

  moveToNextRecipe() {
    this.currentRecipeIndex.set(this.currentRecipeIndex() + 1);
    
    if (this.currentRecipeIndex() < this.availableRecipes.length) {
      this.displayCurrentRecipe();
    } else {
      this.noMoreRecipes.set(true);
      console.log('Reached end of recipes');
      this.cdr.markForCheck();
    }
  }

  onLike() {
    if (this.isLocked() || this.noMoreRecipes()) return;
    
    const recipe = this.currentRecipe();
    if (!recipe) return;

    this.isLiked.set(true);
    this.isLocked.set(true);
    this.cdr.markForCheck();
    
    this.savedRecipeService.saveRecipe(recipe.recipe_id, this.authService.userIdValue()).subscribe({
      next: (res) => {
        console.log('Recipe saved successfully:', res);
      },
      error: (err) => {
        console.error('Error saving recipe:', err);
      }
    });
    
    setTimeout(() => {
      this.isLiked.set(false);
      this.resetAnimation.set(true);
      this.cdr.markForCheck();

      setTimeout(() => {
        this.resetAnimation.set(false);
        this.isLocked.set(false);
        this.moveToNextRecipe();
      }, 500);
    }, 800);
  }

  onSkip() {
    if (this.isLocked() || this.noMoreRecipes()) return;
    
    this.isSkipped.set(true);
    this.isLocked.set(true);
    this.cdr.markForCheck();
    
    setTimeout(() => {
      this.isSkipped.set(false);
      this.resetAnimation.set(true);
      this.cdr.markForCheck();

      setTimeout(() => {
        this.resetAnimation.set(false);
        this.isLocked.set(false);
        this.moveToNextRecipe();
      }, 500);
    }, 800);
  }
}