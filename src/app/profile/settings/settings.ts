import { Component } from '@angular/core';
import { Header } from "../../Components/header/header";
import { Searchbar } from "../../Components/searchbar/searchbar";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { Recipecard } from "../../Components/recipecard/recipecard";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Sidebar } from "../../Components/sidebar/sidebar";

@Component({
  selector: 'app-settings',
  imports: [Header, Searchbar, MatCardModule, MatIconModule, Recipecard, MatToolbarModule, Sidebar],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {

}
