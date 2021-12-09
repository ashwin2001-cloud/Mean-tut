import { Post } from "./posts-model";

export class PostService{

  private posts: Post[]= [];

  getPosts(){
    return [...this.posts];
  }

  addPost(title_arg: string, desc_arg: string){
    const post: Post= { title: title_arg, desc: desc_arg }
    this.posts.push(post);
  }

}
