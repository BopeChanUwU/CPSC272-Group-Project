import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { Header } from "./Components/header/header";
import { Searchbar } from "./Components/searchbar/searchbar";
import { Home } from "./home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatCardModule, Header, Searchbar, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  
}
