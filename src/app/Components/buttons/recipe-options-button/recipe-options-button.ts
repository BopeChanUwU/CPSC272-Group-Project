import { Component, Input } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { RecipeService } from '../../../services/recipe.service';
import { AuthService } from '../../../services/auth.service';
import { SavedRecipiesService } from '../../../services/savedRecipies.service';

@Component({
  selector: 'app-recipe-options-button',
  imports: [MatIconModule, MatMenuModule, MatButtonModule, CommonModule],
  templateUrl: './recipe-options-button.html',
  styleUrl: './recipe-options-button.css'
})
export class RecipeOptionsButton {
  @Input() isMyRecipe: boolean = true;
  @Input() recipe_id: number = -1;

  constructor(private router: Router, 
    private recipeService: RecipeService,  
    private authService: AuthService,
    private savedRecipeService: SavedRecipiesService) {}

  isMyRecipeFlag(): boolean {
    return this.isMyRecipe;
  }

  editRecipe() {
    this.recipeService.setEditRecipeId(this.recipe_id);
    this.router.navigate(['/edit_my_recipes']);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe_id).subscribe(() => {
      console.log('Recipe deleted successfully');
    });
  }

  unlikeRecipe() {
    this.savedRecipeService.unsaveRecipe(this.authService.userIdValue(), this.recipe_id).subscribe(() => {
      console.log('Recipe unsaved successfully');
    });
  }
}
