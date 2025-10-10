import { Component, input } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { Searchbar } from "../Components/searchbar/searchbar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Header } from "../Components/header/header";
import { MatIcon } from "@angular/material/icon"
import { MatButton } from "@angular/material/button";
import { Sidebar } from "../Components/sidebar/sidebar";
import { Recipecard } from "../Components/recipecard/recipecard";
import { Tindercards } from "../Components/tindercards/tindercards/tindercards";


@Component({
  selector: 'app-home',
  imports: [MatCardModule, Searchbar, MatToolbarModule, Header, MatIcon, MatButton, Sidebar, Recipecard, Tindercards],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {
  title = input();

}
