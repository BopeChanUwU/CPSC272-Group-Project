import { Component } from '@angular/core';
import { Header } from '../Components/header/header';
import { Searchbar } from "../Components/searchbar/searchbar";
import { Sidebar } from "../Components/sidebar/sidebar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Recipecard } from "../Components/recipecard/recipecard";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-profile',
  imports: [Header, Searchbar, Sidebar, MatToolbarModule, Recipecard, MatCardModule, MatIconModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

}
