import { Component, input } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Header } from "../Components/header/header";
import { MatIcon } from "@angular/material/icon"
import { MatButton } from "@angular/material/button";
import { LikeButton } from "../Components/like-button/like-button";
import { SkipButton } from "../Components/skip-button/skip-button";
import { Recipecard } from "../Components/recipecard/recipecard";


@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatToolbarModule, Header, MatIcon, MatButton, LikeButton, SkipButton, Recipecard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {
  title = input();

}
