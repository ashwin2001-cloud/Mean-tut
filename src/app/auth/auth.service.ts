import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';

import { AuthData } from './authdata.model';

@Injectable({providedIn: 'root'})
export class AuthService{

  private isAuthenticated= false;
  private token: string;
  private authStatusListener= new Subject<boolean>();
  private tokenTimer: any;
  private userId: string;
  constructor(private http: HttpClient, private router: Router){}

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  isAuth(){return this.isAuthenticated;}
  getToken(){return this.token;}
  getUserId(){return this.userId;}

  createUser(email: string, password: string){
    const authData: AuthData= {
      email: email,
      password: password
    }
    this.http.post<{message: string, user: any}>('http://localhost:3000/api/users/signup', authData)
    .subscribe((data)=>{
      console.log(data);
      this.router.navigate(['/login']);
    })
  }

  login(email: string, password: string){
    const authData: AuthData= {
      email: email,
      password: password
    }
    this.http.post<{message: string, token: string, userId: string, expiresIn: number}>('http://localhost:3000/api/users/login', authData)
    .subscribe((data)=>{
      this.token= data.token;
      console.log(this.token);
      if(this.token){
        const expiresIn= data.expiresIn;
        this.setAuthtimer(expiresIn);
        this.isAuthenticated= true;
        this.userId= data.userId;
        this.authStatusListener.next(true);
        const now= new Date();
        const expirationDate= new Date(now.getTime() + (expiresIn*1000));
        console.log(expirationDate);
        this.saveAuthData(this.token, expirationDate, data.userId);
        this.router.navigate(['/']);
      }
    })
  }

  autoAuthUser(){
    const authInfo= this.getAuthData();
    if(!authInfo){return;}
    const now= new Date();
    const expiresIn= new Date(authInfo.expirationDate).getTime() - now.getTime();
    if(expiresIn>0){
      this.token= authInfo.token;
      this.isAuthenticated= true;
      this.userId= authInfo.userId;
      this.authStatusListener.next(true);
      this.setAuthtimer(expiresIn/1000);//expiresIn is in milliseconds
    }
    else this.clearAuthData();
  }

  private getAuthData(){
    const token= localStorage.getItem('token');
    const expirationDate= localStorage.getItem('date');
    const userId= localStorage.getItem('userId');
    if(!token || !expirationDate){
      return;
    }
    return {token: token, expirationDate: expirationDate, userId: userId}
  }

  private setAuthtimer(duration: number){
    this.tokenTimer= setTimeout(()=> this.logout(), duration*1000);
  }

  logout(){
    this.isAuthenticated= false;
    this.userId= null;
    this.token= null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string){
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('date', expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('date');
    localStorage.removeItem('userId');
  }
}
