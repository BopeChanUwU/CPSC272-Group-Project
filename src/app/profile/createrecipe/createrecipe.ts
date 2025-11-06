import { Component } from '@angular/core';
import { Header } from "../../Components/bars/header/header";
import { Sidebar } from "../../Components/bars/sidebar/sidebar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CreateButton } from "../../Components/buttons/create-button/create-button";
import { MatFormField } from  "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { DragNDropBox } from "../../Components/drag-n-drop-box/drag-n-drop-box";
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms';
import { CreationCard } from "../../Components/cards/creation-card/creation-card";
@Component({
  selector: 'app-createrecipe',
  imports: [Header, Sidebar, MatToolbarModule, MatCardModule, MatIconModule, CreateButton, MatFormField, MatInputModule, MatLabel, DragNDropBox, FormsModule, CreationCard],
  templateUrl: './createrecipe.html',
  styleUrl: './createrecipe.css'
})

export class Createrecipe implements Recipe{

  recipe_id: number;
  author_id: number;
  user_name: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;

  constructor() {
    this.recipe_id = 0;
    this.author_id = 0;
    this.user_name = '';
    this.title = '';
    this.description = '';
    this.ingredients = [];
    this.instructions = [];
    this.imageUrl = '';
  }

  createRecipe() {
    this.title = ((document.getElementById("recipe-name") as HTMLInputElement).value);
    this.description = ((document.getElementById("recipe-description") as HTMLInputElement).value);
    this.recipe_id = Date.now(); // Simple unique ID based on timestamp (not for production use! we will get IDs from user)
    // Logic to create a new recipe
    console.log('Recipe Created:', this);
    ((document.getElementById("recipe-name") as HTMLInputElement).value) = '';
    ((document.getElementById("recipe-description") as HTMLInputElement).value) = '';
  }

   
  
}
