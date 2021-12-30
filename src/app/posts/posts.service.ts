import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from "./posts.model";

@Injectable({providedIn: 'root'})
export class PostsService{

  private posts: Post[]= [];
  private postsUpdated= new Subject<{posts: Post[], postsCount: number}>();

  constructor(private http: HttpClient, private router: Router){}

  getPosts(pageSize: number, currentPage: number){
    const queryParams= `?pageSize=${pageSize}&page=${currentPage}`;
    this.http.get<{message: string, posts: any, maxPosts: number}>('http://localhost:3000/api/posts' + queryParams)
    .pipe(map((postData)=>{
      return {
        posts: postData.posts.map(post=>{
          return {
            title: post.title,
            desc: post.desc,
            id: post._id,
            imagePath: post.imagePath,
            creator: post.creator
          }
        }),
        maxPosts: postData.maxPosts
      }
    }))
    .subscribe((transformedData)=>{
      console.log(transformedData.maxPosts);
      this.posts= transformedData.posts;
      this.postsUpdated.next({posts: [...this.posts], postsCount: transformedData.maxPosts});
    })
  }

  getPostsUpdatedlistener(){
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return this.http.get<{_id: string, title: string, desc: string, imagePath: string, creator: string}>(`http://localhost:3000/api/posts/${id}`);
  }

  addPost(title: string, desc: string, image: File){
    const postData= new FormData();
    postData.append('title', title);
    postData.append('desc', desc);
    postData.append('image', image, title);
    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
    .subscribe((data)=>{
      //we don't call postsUpdated observable here, as we will navigate to '/' (posts-list component). So, getPosts will be called again.
      //same for updatePost
      this.router.navigate(['/']);
    })
  }

  updatePost(id: string, title: string, desc: string, image: File | String){
    // const post: Post= {id: id, title: title, desc: desc, imagePath: null}
    let postData;
    if(typeof(image)==='object'){
      postData= new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('desc', desc);
      postData.append('image', image, title);
    }else{
      postData= {
        id: id,
        title: title,
        desc: desc,
        imagePath: image
      }
    }
    this.http.patch('http://localhost:3000/api/posts', postData)
    .subscribe((data)=>{
      // console.log(data);
      this.router.navigate(['/']);
    })
  }

  deletePost(postId: string){
    return this.http.delete<{message: string}>(`http://localhost:3000/api/posts/${postId}`);
  }

}
