import { Component } from '@angular/core';
import { Header } from "../../Components/header/header";
import { Sidebar } from "../../Components/sidebar/sidebar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { CreateButton } from "../../Components/create-button/create-button";
import { MatFormField } from  "@angular/material/form-field";
import { TitleTextfield } from "../../Components/title-textfield/title-textfield";
import { MatInputModule } from '@angular/material/input';
import { DescriptionTextfield } from "../../Components/description-textfield/description-textfield";


@Component({
  selector: 'app-createrecipe',
  imports: [Header, Sidebar, MatToolbarModule, MatCardModule, MatIconModule, CreateButton, MatFormField, TitleTextfield, MatInputModule, DescriptionTextfield],
  templateUrl: './createrecipe.html',
  styleUrl: './createrecipe.css'
})
export class Createrecipe {

}
