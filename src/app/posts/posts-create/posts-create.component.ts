import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../posts-model';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent {

  @Output() postCreated= new EventEmitter<Post>();

  onPostAdd(postForm: NgForm){
    console.dir(postForm);
    if(postForm.invalid){
      return;
    }
    const newPost: Post= {
      title: postForm.value.title,
      desc: postForm.value.desc
    }
    this.postCreated.emit(newPost);
  }


}
