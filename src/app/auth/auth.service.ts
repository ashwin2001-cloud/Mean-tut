import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthData } from './authdata.model';

@Injectable({providedIn: 'root'})
export class AuthService{

  private isAuthenticated= false;
  private token: string;
  private authStatusListener= new Subject<boolean>();
  constructor(private http: HttpClient){}

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
    this.http.post<{message: string, token: string}>('http://localhost:3000/api/users/login', authData)
    .subscribe((data)=>{
      this.token= data.token;
      console.log(this.token);
      this.isAuthenticated= true;
      this.authStatusListener.next(true);
    })
  }
}
