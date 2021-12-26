import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthData } from './authdata.model';

@Injectable({providedIn: 'root'})
export class AuthService{

  constructor(private http: HttpClient){}

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
}
