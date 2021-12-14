import { Subject } from 'rxjs';

import { Post } from "./posts.model";

export class PostsService{

  private posts: Post[]= [];
  private postsUpdated= new Subject<Post[]>();

  getPosts(){
    return this.posts;
  }

  getPostsUpdatedlistener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title_arg: string, desc_arg: string){
    const post: Post= { title: title_arg, desc: desc_arg }
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

}
