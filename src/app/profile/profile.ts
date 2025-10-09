import { Component } from '@angular/core';
import { Navbar } from "../Components/navbar/navbar";
import { Header } from '../Components/header/header';

const routes = [];
@Component({
  selector: 'app-profile',
  imports: [ Navbar, Header],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

}
