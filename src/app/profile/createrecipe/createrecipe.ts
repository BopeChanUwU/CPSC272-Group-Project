import { Component } from '@angular/core';
import { Header } from "../../Components/header/header";
import { Sidebar } from "../../Components/sidebar/sidebar";
import { Searchbar } from "../../Components/searchbar/searchbar";
import { Recipecard } from "../../Components/recipecard/recipecard";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-createrecipe',
  imports: [Header, Sidebar, Searchbar, Recipecard, MatToolbarModule, MatCardModule, MatIconModule],
  templateUrl: './createrecipe.html',
  styleUrl: './createrecipe.css'
})
export class Createrecipe {

}
