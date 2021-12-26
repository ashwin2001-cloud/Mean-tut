import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostsCreateComponent } from "./posts/posts-create/posts-create.component";
import { PostsListComponent } from "./posts/posts-list/posts-list.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";

const routes: Routes= [
  { path: '', component: PostsListComponent },
  { path: 'create', component: PostsCreateComponent },
  { path: 'edit/:postId', component: PostsCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{

}
