import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

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
  isLoading: boolean= false;
  totalPosts: number;
  postsPerPage: number= 1;
  pageSizeOptions: number[]= [1, 2, 5, 10];
  currentPage: number= 1;

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts(this.postsPerPage, 1);
    this.isLoading= true;
    this.postsSub= this.postsService.getPostsUpdatedlistener()
    .subscribe((postData: {posts: Post[], postsCount: number})=>{
      this.isLoading= false;
      this.savedPosts= postData.posts;
      this.totalPosts= postData.postsCount;
    })
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId).subscribe((data)=>{
      this.currentPage=1;
      this.postsService.getPosts(this.postsPerPage, 1);
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
