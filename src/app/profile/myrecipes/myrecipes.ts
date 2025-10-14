import { Component } from '@angular/core';
import { Sidebar } from "../../Components/sidebar/sidebar";
import { Header } from "../../Components/header/header";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Searchbar } from "../../Components/searchbar/searchbar";
import { Recipecard } from "../../Components/recipecard/recipecard";
import { DeleteButton } from "../../Components/delete-button/delete-button";

@Component({
  selector: 'app-myrecipes',
  imports: [Sidebar, Header, MatToolbarModule, Searchbar, Recipecard, DeleteButton],
  templateUrl: './myrecipes.html',
  styleUrl: './myrecipes.css'
})
export class Myrecipes {

}
