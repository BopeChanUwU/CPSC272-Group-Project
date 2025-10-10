import { Component } from '@angular/core';
import { Header } from "../../Components/header/header";
import { Sidebar } from "../../Components/sidebar/sidebar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CreateButton } from "../../Components/create-button/create-button";

@Component({
  selector: 'app-createrecipe',
  imports: [Header, Sidebar, MatToolbarModule, MatCardModule, MatIconModule, CreateButton],
  templateUrl: './createrecipe.html',
  styleUrl: './createrecipe.css'
})
export class Createrecipe {

}
