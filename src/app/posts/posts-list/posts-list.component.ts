import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../posts-model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  @Input() savedPosts: Post[];

  constructor() { }

  ngOnInit(): void {
  }

}
