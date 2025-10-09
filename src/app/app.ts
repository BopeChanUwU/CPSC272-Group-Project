import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatCardModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  login: boolean = false;
  home: boolean = false;
  profile: boolean = false;
  title: string = 'PotLuck';

  constructor (){
    login: true;
  }
  
}
