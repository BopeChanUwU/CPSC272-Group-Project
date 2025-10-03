import { Component } from '@angular/core';
import { MatCard, MatCardModule } from "@angular/material/card";
import { Searchbar } from "../Components/searchbar/searchbar";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: 'app-home',
  imports: [MatCard, MatCardModule, Searchbar, MatToolbarModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
