import { Component } from '@angular/core';
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
@Component({
  selector: 'app-createrecipe',
  imports: [Header, Sidebar, MatToolbarModule, MatCardModule, MatIconModule, CreateButton, MatInputModule, FormsModule, CreationCard],
  templateUrl: './createrecipe.html',
  styleUrl: './createrecipe.css'
})

export class Createrecipe implements Recipe {
  author_id: number;
  title: string;
  description: string;
  user_name: string;
  ingredients?: string[] | undefined;
  instructions?: string[] | undefined;
  imageUrl?: string | undefined;

  constructor(private recipeService: RecipeService, private authService: AuthService) {
    this.author_id = 0;
    this.title = "";
    this.description = "";
    this.user_name = "";
  }

  createRecipe() {
    this.author_id = this.authService.userIdValue();
    this.title = ((document.getElementById("recipe-name") as HTMLInputElement).value);
    this.description = ((document.getElementById("recipe-description") as HTMLInputElement).value);
    this.user_name = this.authService.userValue()?.user_name || '';
    const newRecipe: Recipe = {
      author_id: this.author_id,
      title: this.title,
      description: this.description,
      user_name: this.user_name
    };
    this.recipeService.addRecipe(newRecipe).subscribe((res: Recipe) => {
      console.log('Recipe successfully created:', res);
    });
  }
  
}
