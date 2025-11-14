import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatFormField } from  "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { DragNDropBox } from "../../drag-n-drop-box/drag-n-drop-box";
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-creation-card',
  imports: [MatCardModule, MatFormField, DragNDropBox, MatInputModule, MatLabel, MatIconModule, FormsModule],
  templateUrl: './creation-card.html',
  styleUrl: './creation-card.css'
})
export class CreationCard {
  @ViewChild(DragNDropBox) dragDropComponent!: DragNDropBox;

  recipe: Recipe = {
    author_id: 0,
    title: '',
    description: '',
    user_name: '',
    ingredients: [],
    instructions: [],
    image_url: new Blob()
  };

  constructor(private recipeService: RecipeService, private authService: AuthService) {
    this.recipe.author_id = this.authService.userIdValue();
    this.recipe.user_name = this.authService.userNameValue();
  }

  userName(): string {
    return this.authService.userNameValue();
  }

  onFileSelected(blob: Blob): void {
    this.recipe.image_url = blob;
    console.log('Image blob received in CreationCard:', blob.size, 'bytes', blob.type);
  }

  setExistingImage(dataURL: string): void {
    // Set the preview in the drag-drop component
    if (this.dragDropComponent) {
      this.dragDropComponent.previewUrl = dataURL;
    }
  }

  getRecipeData(): Recipe {
    console.log('Getting recipe data:', {
      title: this.recipe.title,
      description: this.recipe.description,
      imageSize: this.recipe.image_url?.size
    });
    return this.recipe;
  }
}