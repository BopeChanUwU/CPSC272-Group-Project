import { Component, ViewChild } from '@angular/core';
import { Header } from "../../Components/bars/header/header";
import { Sidebar } from "../../Components/bars/sidebar/sidebar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CreateButton } from "../../Components/buttons/create-button/create-button";
import { MatInputModule } from '@angular/material/input';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CreationCard } from "../../Components/cards/creation-card/creation-card";
import { Router } from '@angular/router';

@Component({
  selector: 'app-createrecipe',
  imports: [Header, Sidebar, MatToolbarModule, MatCardModule, MatIconModule, CreateButton, MatInputModule, FormsModule, CreationCard],
  templateUrl: './createrecipe.html',
  styleUrl: './createrecipe.css'
})
export class Createrecipe {
  @ViewChild(CreationCard) creationCard!: CreationCard;

  constructor(
    private recipeService: RecipeService, 
    private authService: AuthService,
    private router: Router
  ) {}

  async createRecipe() {
    const recipe = this.creationCard.getRecipeData();
    
    // Debug logging
    console.log('Recipe data:', recipe);
    console.log('Title:', recipe.title);
    console.log('Description:', recipe.description);
    console.log('Image blob size:', recipe.image_url?.size);
    
    // Validate required fields
    if (!recipe.title || !recipe.description) {
      alert('Please fill in all required fields (title and description)');
      return;
    }

    // Convert Blob to Base64 for transmission (only if image exists)
    let imageBase64 = null;
    if (recipe.image_url && recipe.image_url.size > 0) {
      imageBase64 = await this.blobToBase64(recipe.image_url);
    }
    
    const newRecipe = {
      author_id: this.authService.userIdValue(),
      title: recipe.title,
      description: recipe.description,
      user_name: this.authService.userNameValue(),
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || [],
      image_url: imageBase64 // Send as base64 string or null
    };

    console.log('Sending recipe to backend:', { ...newRecipe, image_url: imageBase64 ? 'base64 data' : null });

    this.recipeService.addRecipe(newRecipe as any).subscribe({
      next: (res: Recipe) => {
        console.log('Recipe successfully created:', res);
        alert('Recipe created successfully!');
        this.router.navigate(['/my_recipes']);
      },
      error: (err) => {
        console.error('Error creating recipe:', err);
        alert('Error creating recipe. Please try again.');
      }
    });
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix to get just the base64 data
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}