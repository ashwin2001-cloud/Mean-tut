import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean= false;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm){
    if(loginForm.invalid){
      console.log('Invalid');
    }
    console.log(loginForm.value);
    this.authService.login(loginForm.value.email, loginForm.value.password);
  }

}
