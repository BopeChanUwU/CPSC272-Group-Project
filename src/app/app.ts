import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { Header } from "./Components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatIcon, MatButtonModule, MatMenuModule, MatIconModule, MatCardModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  
}
