import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  isLoading: boolean= false;
  form: FormGroup

  constructor(public postsService: PostsService,
    public route: ActivatedRoute){}
    //'route' in constructor gives the path name, by which component was called

  ngOnInit(){
    //initialize form and define its controls
    this.form= new FormGroup({
      //beginning form state, validators
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      desc: new FormControl(null, {
        validators: [Validators.required]
      })
    })
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode= 'edit';
        this.postId= paramMap.get('postId');
        this.isLoading= true;
        this.postsService.getPost(this.postId).subscribe(postData=>{
          this.isLoading= false;
          this.post= {id: postData._id, title: postData.title, desc: postData.desc}
        })
        this.form.setValue({
          title: this.post.title,
          desc: this.post.desc
        });
      }else{
        this.mode= 'create';
        this.postId= null;
        this.post= null;
      }
    })
    console.log('***', this.post, '***');
  }

  onSavePost(){
    // console.dir(postForm);
    if(this.form.invalid){
      return;
    }

    this.isLoading= true;
    if(this.mode == 'create'){
      this.postsService.addPost(this.form.value.title, this.form.value.desc);
    }
    else if(this.mode == 'edit'){
      this.postsService.updatePost(this.post.id, this.form.value.title, this.form.value.desc);
    }
    this.form.reset();
  }


}
