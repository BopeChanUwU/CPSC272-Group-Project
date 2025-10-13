import { Component } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-description-textfield',
  imports: [ MatInputModule],
  templateUrl: './description-textfield.html',
  styleUrl: './description-textfield.css'
})
export class DescriptionTextfield {

}
