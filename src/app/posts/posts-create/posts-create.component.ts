import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent {

  constructor(public postsService: PostsService){}

  onPostAdd(postForm: NgForm){
    // console.dir(postForm);
    if(postForm.invalid){
      return;
    }
    this.postsService.addPost(postForm.value.title, postForm.value.desc);
    postForm.resetForm();
  }


}
