import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from "./posts.model";

@Injectable({providedIn: 'root'})
export class PostsService{

  private posts: Post[]= [];
  private postsUpdated= new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts(){
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{
      return postData.posts.map(post=>{
        return {
          title: post.title,
          desc: post.desc,
          id: post._id
        }
      })
    }))
    .subscribe((transformedPosts)=>{
      // console.log(transformedPosts);
      this.posts= transformedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }

  getPostsUpdatedlistener(){
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return {...this.posts.find(post=> post.id===id)}
  }

  addPost(title_arg: string, desc_arg: string){
    const post: Post= { id: null, title: title_arg, desc: desc_arg };
    this.http.post<{message: string, id: string}>('http://localhost:3000/api/posts', post)
    .subscribe((data)=>{
      // console.log(data.message);
      post.id= data.id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    })
  }

  updatePost(id: string, title: string, desc: string){
    const post: Post= {id: id, title: title, desc: desc};
    this.http.patch('http://localhost:3000/api/posts', post)
    .subscribe((data)=>{
      console.log(data);
    })
  }

  deletePost(postId: string){
    this.http.delete(`http://localhost:3000/api/posts/${postId}`)
    .subscribe((data)=>{
      console.log(data);
    })
    this.posts= this.posts.filter((post)=>{
      return post.id!==postId;
    })
    this.postsUpdated.next([...this.posts]);
  }

}
