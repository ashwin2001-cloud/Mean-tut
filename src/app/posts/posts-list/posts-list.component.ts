import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../posts.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {

  savedPosts: Post[];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.savedPosts= this.postsService.getPosts();
    this.postsSub= this.postsService.getPostsUpdatedlistener()
    .subscribe((posts: Post[])=>{
      this.savedPosts= posts;
    })
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

}
