import { Component, input } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { RecipeService } from '../../../services/recipe.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-recipe-options-button',
  imports: [MatIconModule, MatMenuModule, MatButtonModule, CommonModule],
  templateUrl: './recipe-options-button.html',
  styleUrl: './recipe-options-button.css'
})
export class RecipeOptionsButton {
  isMyrecipe = true;

  constructor(private router: Router, 
    private recipeService: RecipeService, 
    private userService: UserService, 
    private authService: AuthService) {}

  isMyrecipeFlag(): boolean {
    return this.isMyrecipe;
  }

  editRecipe() {
    this.router.navigate(['/edit_my_recipes']);
  }

  deleteRecipe() {
    this.deleteRecipe();
  }

  unlikeRecipe() {
    this.unlikeRecipe();
    //add logic to unlike saved recipe
  }
}
