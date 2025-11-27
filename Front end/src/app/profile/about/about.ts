import { Component } from '@angular/core';
import { Sidebar } from "../../Components/bars/sidebar/sidebar";
import { Header } from "../../Components/bars/header/header";

@Component({
  selector: 'app-about',
  imports: [Sidebar, Header],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

}
