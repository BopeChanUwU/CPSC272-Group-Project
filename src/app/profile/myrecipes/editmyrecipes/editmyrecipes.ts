import { Component } from '@angular/core';
import { Header } from "../../../Components/bars/header/header";
import { Sidebar } from "../../../Components/bars/sidebar/sidebar";
import { CreationCard } from "../../../Components/cards/creation-card/creation-card";
import { CreateButton } from "../../../Components/buttons/create-button/create-button";
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-editmyrecipes',
  imports: [Header, Sidebar, CreationCard, CreateButton],
  templateUrl: './editmyrecipes.html',
  styleUrl: './editmyrecipes.css'
})
export class Editmyrecipes {
  recipe_id: number = 0;
  author_id: number = 0;
  title: string = "";
  description: string = "";
  user_name: string = "";
  ingredients: string[] = [" "];
  instructions: string[] = [" "];
  image_url: Blob = new Blob();
  

  constructor(private recipeService: RecipeService, private authService: AuthService) {
    this.recipe_id = this.recipeService.getEditRecipeId();
  }
  

  editRecipe() {
    this.author_id = this.authService.userIdValue();
    this.title = ((document.getElementById("recipe-name") as HTMLInputElement).value);
    this.description = ((document.getElementById("recipe-description") as HTMLInputElement).value);
    this.user_name = this.authService.userNameValue();
    const newRecipe: Recipe = {
      author_id: this.author_id,
      title: this.title,
      description: this.description,
      user_name: this.user_name,
      ingredients: this.ingredients,
      instructions: this.instructions,
      image_url: this.image_url
    };

    this.recipeService.updateRecipe(this.recipe_id, newRecipe).subscribe((res: Recipe) => {
      console.log('Recipe successfully created:', res);
    });
    console.log('Editing recipe with ID:', this.recipe_id);
  }
}
