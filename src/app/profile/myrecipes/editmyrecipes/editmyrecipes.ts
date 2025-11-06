import { Component } from '@angular/core';
import { Header } from "../../../Components/bars/header/header";
import { Sidebar } from "../../../Components/bars/sidebar/sidebar";
import { CreationCard } from "../../../Components/cards/creation-card/creation-card";
import { CreateButton } from "../../../Components/buttons/create-button/create-button";

@Component({
  selector: 'app-editmyrecipes',
  imports: [Header, Sidebar, CreationCard, CreateButton],
  templateUrl: './editmyrecipes.html',
  styleUrl: './editmyrecipes.css'
})
export class Editmyrecipes {

}
