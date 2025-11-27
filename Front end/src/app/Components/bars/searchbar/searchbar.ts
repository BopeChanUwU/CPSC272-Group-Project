import { Component } from '@angular/core';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from "@angular/material/toolbar";


@Component({
  selector: 'app-searchbar',
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, MatToolbar],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css'
})
export class Searchbar {

}
