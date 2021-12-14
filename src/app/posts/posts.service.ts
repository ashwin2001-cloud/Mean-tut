import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from "./posts.model";

@Injectable({providedIn: 'root'})
export class PostsService{

  private posts: Post[]= [];
  private postsUpdated= new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData)=>{
      console.log(postData);
      this.posts= postData.posts;
      this.postsUpdated.next([...this.posts]);
    })
  }

  getPostsUpdatedlistener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title_arg: string, desc_arg: string){
    const post: Post= { id: null, title: title_arg, desc: desc_arg };
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
    .subscribe((data)=>{
      console.log(data.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    })
  }

}
