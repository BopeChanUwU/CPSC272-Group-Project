import { Component } from '@angular/core';
import { Header } from "../../Components/header/header";
import { Sidebar } from "../../Components/sidebar/sidebar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CreateButton } from "../../Components/create-button/create-button";
import { MatFormField } from  "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { DragNDropBox } from "../../Components/drag-n-drop-box/drag-n-drop-box";
import { Recipe } from '../../models/recipe.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-createrecipe',
  imports: [Header, Sidebar, MatToolbarModule, MatCardModule, MatIconModule, CreateButton, MatFormField, MatInputModule, MatLabel, DragNDropBox, FormsModule],
  templateUrl: './createrecipe.html',
  styleUrl: './createrecipe.css'
})

export class Createrecipe implements Recipe{

  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;

  constructor() {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.ingredients = [];
    this.instructions = [];
    this.imageUrl = '';
  }

  createRecipe() {
    // Logic to create a new recipe
    console.log('Recipe Created:', this);
    
  }


}
