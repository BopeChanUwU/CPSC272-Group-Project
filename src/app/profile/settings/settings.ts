import { Component } from '@angular/core';
import { Header } from "../../Components/header/header";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Sidebar } from "../../Components/sidebar/sidebar";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { DragNDropBox } from "../../Components/drag-n-drop-box/drag-n-drop-box";
import { SaveButton } from "../../Components/save-button/save-button";

@Component({
  selector: 'app-settings',
  imports: [Header, MatCardModule, MatIconModule, MatToolbarModule, Sidebar, MatFormField, MatInputModule, MatLabel, MatButtonModule, DragNDropBox, SaveButton],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {

}
