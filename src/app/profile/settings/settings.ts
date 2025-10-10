import { Component } from '@angular/core';
import { Header } from "../../Components/header/header";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Sidebar } from "../../Components/sidebar/sidebar";

@Component({
  selector: 'app-settings',
  imports: [Header, MatCardModule, MatIconModule, MatToolbarModule, Sidebar],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {

}
