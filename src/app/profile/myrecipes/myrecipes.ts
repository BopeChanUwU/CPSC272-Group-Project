import { Component } from '@angular/core';
import { Sidebar } from "../../Components/bars/sidebar/sidebar";
import { Header } from "../../Components/bars/header/header";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Searchbar } from "../../Components/bars/searchbar/searchbar";
import { Recipecard } from "../../Components/cards/recipecard/recipecard";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RecipeService } from '../../services/recipe.service';
import { SavedRecipiesService } from '../../services/savedRecipies.service';

@Component({
  selector: 'app-myrecipes',
  imports: [Sidebar, Header, MatToolbarModule, Searchbar, Recipecard, CommonModule],
  templateUrl: './myrecipes.html',
  styleUrl: './myrecipes.css'
})
export class Myrecipes {
  recipes: any[] = [];

  constructor(private authService: AuthService, private recipeService: RecipeService, savedRecipeService: SavedRecipiesService) {}

  ngOnInit() {
    // TODO: Replace this with actual service call to get user's recipes
    this.recipeService.getRecipesByAuthor(this.authService.userIdValue()).subscribe((res: any[]) => {
      this.recipes = res;
      console.log('User recipes loaded:', this.recipes);
    });
  }
}
