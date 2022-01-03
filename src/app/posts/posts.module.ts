import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AngularMatModule } from "../angular-material.module";

import { PostsCreateComponent } from "./posts-create/posts-create.component";
import { PostsListComponent } from "./posts-list/posts-list.component";

@NgModule({
  declarations: [
    PostsListComponent,
    PostsCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMatModule
  ]
})

export class PostsModule{}
