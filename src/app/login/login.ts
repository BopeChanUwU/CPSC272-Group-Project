import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  newUser = {

    firstname:'',
    lastname: '',
    username: '',
    email: '',
    password: ''
    
  }
}
