import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './authdata.model';

@Injectable({providedIn: 'root'})
export class AuthService{

  private isAuthenticated= false;
  private token: string;
  private authStatusListener= new Subject<boolean>();
  private tokenTimer: any;
  constructor(private http: HttpClient, private router: Router){}

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  isAuth(){
    return this.isAuthenticated;
  }

  getToken(){
    return this.token;
  }

  createUser(email: string, password: string){
    const authData: AuthData= {
      email: email,
      password: password
    }
    this.http.post<{message: string, user: any}>('http://localhost:3000/api/users/signup', authData)
    .subscribe((data)=>{
      console.log(data);
    })
  }

  login(email: string, password: string){
    const authData: AuthData= {
      email: email,
      password: password
    }
    this.http.post<{message: string, token: string, expiresIn: number}>('http://localhost:3000/api/users/login', authData)
    .subscribe((data)=>{
      this.token= data.token;
      console.log(this.token);
      if(this.token){
        const expiresIn= data.expiresIn;
        this.tokenTimer= setTimeout(()=>{
          this.logout();
          console.log('wahe guru');
        },
        10000);
        this.isAuthenticated= true;
        console.log('***', this.tokenTimer, '***');
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
      }
    })
  }

  logout(){
    this.isAuthenticated= false;
    this.token= null;
    this.authStatusListener.next(false);
    console.log('***', this.tokenTimer, '***');
    clearTimeout(this.tokenTimer);
    console.log('***', this.tokenTimer, '***');
    this.router.navigate(['/']);
  }
}
