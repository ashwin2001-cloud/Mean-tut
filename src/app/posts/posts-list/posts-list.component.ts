import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts= [
    {
      title: "Title1",
      desc: "This is my post1"
    },
    {
      title: "Title2",
      desc: "This is my post2"
    },
    {
      title: "Title3",
      desc: "This is my post3"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
