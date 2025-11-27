import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from "../../../Components/bars/header/header";
import { Sidebar } from "../../../Components/bars/sidebar/sidebar";
import { CreationCard } from "../../../Components/cards/creation-card/creation-card";
import { UpdateButton } from "../../../Components/buttons/update-button/update-button";
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editmyrecipes',
  imports: [Header, Sidebar, CreationCard, UpdateButton, CommonModule],
  templateUrl: './editmyrecipes.html',
  styleUrl: './editmyrecipes.css'
})
export class Editmyrecipes implements OnInit, AfterViewInit {
  @ViewChild(CreationCard) creationCard!: CreationCard;
  
  recipe_id: number = 0;
  isLoading: boolean = true;
  originalRecipe: any = null;
  originalImageBlob: Blob | null = null;

  constructor(
    private recipeService: RecipeService, 
    private authService: AuthService,
    private router: Router
  ) {
    this.recipe_id = this.recipeService.getEditRecipeId();
    
    if (!this.recipe_id || this.recipe_id === 0) {
      console.error('No recipe ID found for editing');
      this.router.navigate(['/my_recipes']);
    }
  }
  
  ngOnInit() {
    this.loadRecipeData();
  }

  ngAfterViewInit() {
    // Ensure creation card is available
  }

  loadRecipeData() {
    this.recipeService.getRecipesByAuthor(this.authService.userIdValue()).subscribe({
      next: async (recipes: any[]) => {
        const recipe = recipes.find(r => r.recipe_id === this.recipe_id);
        
        if (recipe) {
          // Store original recipe data
          this.originalRecipe = { ...recipe };
          
          // Wait for view to initialize
          setTimeout(async () => {
            if (this.creationCard) {
              // Populate the creation card with existing recipe data
              this.creationCard.recipe.title = recipe.title;
              this.creationCard.recipe.description = recipe.description;
              this.creationCard.recipe.ingredients = recipe.ingredients || [];
              this.creationCard.recipe.instructions = recipe.instructions || [];
              
              // Handle existing image
              if (recipe.image_url && recipe.image_url.startsWith('data:image')) {
                const blob = await this.dataURLtoBlob(recipe.image_url);
                this.originalImageBlob = blob;
                this.creationCard.recipe.image_url = blob;
                this.creationCard.setExistingImage(recipe.image_url);
              }
              
              console.log('Loaded recipe for editing:', recipe);
            }
            this.isLoading = false;
          }, 100);
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error loading recipe:', err);
        alert('Error loading recipe data');
        this.router.navigate(['/my_recipes']);
      }
    });
  }

  async editRecipe() {
    if (this.isLoading || !this.originalRecipe) {
      console.log('Cannot update: loading or no original recipe');
      return;
    }

    const currentData = this.creationCard.getRecipeData();
    
    console.log('Current form data:', currentData);
    console.log('Original recipe:', this.originalRecipe);
    
    // Use current data if changed, otherwise use original
    const title = currentData.title?.trim() || this.originalRecipe.title;
    const description = currentData.description?.trim() || this.originalRecipe.description;
    const ingredients = currentData.ingredients || this.originalRecipe.ingredients;
    const instructions = currentData.instructions || this.originalRecipe.instructions;

    // Handle image
    let imageBase64 = null;
    
    // Check if a new image was uploaded (different from original)
    if (currentData.image_url && 
        this.originalImageBlob && 
        currentData.image_url.size !== this.originalImageBlob.size) {
      // New image uploaded
      console.log('New image detected');
      imageBase64 = await this.blobToBase64(currentData.image_url);
    } else if (currentData.image_url && currentData.image_url.size > 0 && !this.originalImageBlob) {
      // New image uploaded (no original)
      console.log('New image uploaded (no original)');
      imageBase64 = await this.blobToBase64(currentData.image_url);
    } else if (this.originalRecipe.image_url) {
      // Keep original image
      console.log('Keeping original image');
      if (this.originalRecipe.image_url.startsWith('data:image')) {
        imageBase64 = this.originalRecipe.image_url.split(',')[1];
      }
    }
    
    const updatedRecipe = {
      author_id: this.authService.userIdValue(),
      title: title,
      description: description,
      user_name: this.authService.userNameValue(),
      ingredients: ingredients,
      instructions: instructions,
      image_url: imageBase64
    };

    console.log('Sending updated recipe to backend:', {
      ...updatedRecipe,
      image_url: imageBase64 ? 'base64 data present' : 'no image'
    });

    this.recipeService.updateRecipe(this.recipe_id, updatedRecipe as any).subscribe({
      next: (res: Recipe) => {
        console.log('Recipe successfully updated:', res);
        alert('Recipe updated successfully!');
        this.router.navigate(['/my_recipes']);
      },
      error: (err) => {
        console.error('Error updating recipe:', err);
        alert('Error updating recipe. Please try again.');
      }
    });
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private dataURLtoBlob(dataURL: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      fetch(dataURL)
        .then(res => res.blob())
        .then(blob => resolve(blob))
        .catch(err => reject(err));
    });
  }
}