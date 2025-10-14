import { Component } from '@angular/core';
import { Header } from "../../Components/header/header";
import { Sidebar } from "../../Components/sidebar/sidebar";
import { Searchbar } from "../../Components/searchbar/searchbar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { Recipecard } from "../../Components/recipecard/recipecard";
import { MatIconModule } from "@angular/material/icon";
import { DislikeButton } from "../../Components/dislike-button/dislike-button";

@Component({
  selector: 'app-savedrecipes',
  imports: [Header, Sidebar, Searchbar, MatToolbarModule, MatCardModule, Recipecard, MatIconModule, DislikeButton],
  templateUrl: './savedrecipes.html',
  styleUrl: './savedrecipes.css'
})
export class Savedrecipes {

}
