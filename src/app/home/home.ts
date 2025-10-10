import { Component, input } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Header } from "../Components/header/header";
import { LikeButton } from "../Components/like-button/like-button";
import { SkipButton } from "../Components/skip-button/skip-button";

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatToolbarModule, Header, LikeButton, SkipButton],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {
  title = input();

}
