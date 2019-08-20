import { Component, OnInit, Input } from '@angular/core';
import { post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  listPosts: post[];
  PostsSubscription: Subscription;

  constructor(private postsService : PostsService) { }

  ngOnInit() {
    this.PostsSubscription = this.postsService.postsSubject.subscribe(
        (posts: post[]) => {  
          this.listPosts = posts;
        }
      );
      this.postsService.emitPosts();
  }
 
  ngOnDestroy() {
        this.PostsSubscription.unsubscribe();
      }
}
