import { Component } from '@angular/core';
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
  imports: [MatCardModule, MatFormField, DragNDropBox, MatInputModule, MatLabel, MatIconModule],
  templateUrl: './creation-card.html',
  styleUrl: './creation-card.css'
})
export class CreationCard {
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
}
