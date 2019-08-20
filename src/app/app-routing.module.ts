import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { NewPostComponent } from './new-post/new-post.component';


const routes: Routes = [
  { path: 'Posts', component: PostListComponent },
  { path: 'NewPost', component: NewPostComponent },
  { path: 'NewPost/:id', component: NewPostComponent },
  { path: '', redirectTo: 'Posts', pathMatch: 'full' },
  { path: '**', redirectTo: 'Posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
