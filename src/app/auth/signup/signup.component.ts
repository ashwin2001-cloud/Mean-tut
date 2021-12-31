import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading= false;
  getAuthStatusListener: Subscription;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.getAuthStatusListener= this.authService.getAuthStatusListener()
    .subscribe(status=>{
      if(!status){
        this.isLoading= false;
      }
    })
  }

  onSignup(signupForm: NgForm){
    if(signupForm.invalid){
      return;
    }
    this.isLoading= true;
    this.authService.createUser(signupForm.value.email, signupForm.value.password);
  }

  ngOnDestroy(){this.getAuthStatusListener.unsubscribe();}
}
