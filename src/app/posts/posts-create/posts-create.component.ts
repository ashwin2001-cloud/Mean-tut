import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../posts.model';
import { mimeType } from './mime-type.validator';

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
  form: FormGroup;
  imageURL: string;

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
      desc: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    })
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode= 'edit';
        this.postId= paramMap.get('postId');
        this.isLoading= true;
        this.postsService.getPost(this.postId).subscribe(postData=>{
          this.isLoading= false;
          this.post= {id: postData._id, title: postData.title, desc: postData.desc}
          this.form.patchValue({
            title: this.post.title,
            desc: this.post.desc
          });
        })
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
    //if condition in validators is not fullfilled, this.form.invalid=false
    console.log(this.form.value.title);
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

  //no need to import Event, as it is default JavaScript type
  onImagePicked(event: Event){
    const file= (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file})
    this.form.get('image').updateValueAndValidity();
    //FileReader-> feature provided by JavaScript; used to get information about files
    const reader= new FileReader();
    console.log(reader);
    //reader.onload-> when file has been uploaded
    reader.onload= ()=>{
      //IMP: reader.result contains reader.readAsDataURL(file);
      this.imageURL= reader.result as string;
    }
    reader.readAsDataURL(file);
    // console.log(event, file, this.form);
  }

}
