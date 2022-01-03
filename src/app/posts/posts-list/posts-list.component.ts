import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { Post } from '../posts.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {

  savedPosts: Post[]= [];
  private postsSub: Subscription;
  private authListenerSub: Subscription;
  isLoading: boolean= false;
  totalPosts: number;
  postsPerPage: number= 1;
  pageSizeOptions: number[]= [1, 2, 5, 10];
  currentPage: number= 1;
  isAuthenticated: boolean;
  userId: string;

  constructor(public postsService: PostsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.postsService.getPosts(this.postsPerPage, 1);
    this.isLoading= true;
    this.isAuthenticated= this.authService.isAuth();
    this.userId= this.authService.getUserId();
    this.postsSub= this.postsService.getPostsUpdatedlistener()
    .subscribe((postData: {posts: Post[], postsCount: number})=>{
      this.isLoading= false;
      this.savedPosts= postData.posts;
      this.totalPosts= postData.postsCount;
    })
    this.authListenerSub= this.authService.getAuthStatusListener()
    .subscribe(status=> {
      this.isAuthenticated= status;
      this.userId=this.authService.getUserId();
    })
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authListenerSub.unsubscribe();
  }

  onDelete(postId: string){
    this.isLoading= true;
    this.postsService.deletePost(postId).subscribe({
      next: (data)=>{
        this.currentPage=1;
        this.postsService.getPosts(this.postsPerPage, 1);
      },
      error: ()=>{this.isLoading= false}
    })
  }

  onChangedPage(pageEvent: PageEvent){
    this.isLoading= true;
    this.currentPage= pageEvent.pageIndex + 1;
    this.postsPerPage= pageEvent.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    console.log(pageEvent);
  }

}
