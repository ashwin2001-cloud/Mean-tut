import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading: boolean= false;
  authListenerSub: Subscription;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authListenerSub= this.authService.getAuthStatusListener()
    .subscribe(status=>{
      if(!status){
        this.isLoading= false;
      }
    })
  }

  onLogin(loginForm: NgForm){
    if(loginForm.invalid){
      console.log('Invalid');
    }
    console.log(loginForm.value);
    this.isLoading= true;
    this.authService.login(loginForm.value.email, loginForm.value.password);
  }

  ngOnDestroy(){this.authListenerSub.unsubscribe()}

}
