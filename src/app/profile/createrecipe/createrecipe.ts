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
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-createrecipe',
  imports: [Header, Sidebar, MatToolbarModule, MatCardModule, MatIconModule, CreateButton, MatInputModule, FormsModule, CreationCard],
  templateUrl: './createrecipe.html',
  styleUrl: './createrecipe.css'
})

export class Createrecipe implements Recipe {
  //ecipe_id: number;
  author_id: number;
  title: string;
  description: string;
  user_name: string;
  ingredients?: string[] | undefined;
  instructions?: string[] | undefined;
  imageUrl?: string | undefined;

  constructor(private userService: UserService, private recipeService: RecipeService, private authService: AuthService) {
    this.author_id = 0;
    this.title = "";
    this.description = "";
    this.user_name = "";
  }

  createRecipe() {
    this.title = ((document.getElementById("recipe-name") as HTMLInputElement).value);
    this.description = ((document.getElementById("recipe-description") as HTMLInputElement).value);
    // Logic to create a new recipe
    console.log('Recipe Created:', this);
    ((document.getElementById("recipe-name") as HTMLInputElement).value) = '';
    ((document.getElementById("recipe-description") as HTMLInputElement).value) = '';
  }

  newRecipe() {
    this.author_id = this.authService.userIdValue();
    this.title = ((document.getElementById("recipe-name") as HTMLInputElement).value);
    this.description = ((document.getElementById("recipe-description") as HTMLInputElement).value);
    //need help here with front services calls to get a user also unsure if i send you a recipe_id or not?( back end)
    this.userService.getUser(this.author_id).subscribe((user: User) => {
      this.user_name = user.user_name || '';
      const newRecipe: Recipe = {
        author_id: this.author_id,
        title: this.title,
        description: this.description,
        user_name: this.user_name,
        ingredients: [],
        instructions: []
      };
      this.recipeService.addRecipe(newRecipe).subscribe((createdRecipe: Recipe) => {
        console.log('Recipe successfully created:', createdRecipe);
        // Optionally, reset the form fields after successful creation
        ((document.getElementById("recipe-name") as HTMLInputElement).value) = '';
        ((document.getElementById("recipe-description") as HTMLInputElement).value) = '';
      }, (error) => {
        console.error('Error creating recipe:', error);
      });
    }, (error) => {
      console.error('Error fetching user:', error);
    });
  }
  
}
