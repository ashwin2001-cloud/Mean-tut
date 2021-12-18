import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../posts.model';

import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit{

  private mode: string= 'create';
  private postId: string= null;
  post: Post= null;

  constructor(public postsService: PostsService,
    public route: ActivatedRoute){}
    //'route' in constructor gives the path name, by which component was called

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode= 'edit';
        this.postId= paramMap.get('postId');
        this.post= this.postsService.getPost(this.postId);
      }else{
        this.mode= 'create';
        this.postId= null;
        this.post= null;
      }
    })
    console.log(this.post);
  }

  onSavePost(postForm: NgForm){
    // console.dir(postForm);
    if(postForm.invalid){
      return;
    }
    if(this.mode == 'create'){
      this.postsService.addPost(postForm.value.title, postForm.value.desc);
    }
    else if(this.mode == 'edit'){
      this.postsService.updatePost(this.post.id, postForm.value.title, postForm.value.desc);
    }
    postForm.resetForm();
  }


}
