import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { Post } from './posts/posts-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-tut';
  savedPosts: Post[]= [];
  onAddPost(post: Post){
    this.savedPosts.push(post);
  }
}
