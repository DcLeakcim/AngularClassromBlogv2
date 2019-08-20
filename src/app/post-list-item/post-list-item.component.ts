import { Component, OnInit, Input } from '@angular/core';
import { post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() unPost : post;

  constructor(private postsService:PostsService,
              private router: Router) { }

  ngOnInit() {
  }

  // Sur clique du bouton Don't like 
  onDontLoveIt() {
    this.unPost.loveIts = this.unPost.loveIts - 1;
    this.postsService.savePost(this.unPost);
  }

  // Sur clique du bouton Like 
  onLoveIt() {
    this.unPost.loveIts = this.unPost.loveIts + 1;
    this.postsService.savePost(this.unPost);
  }

  // Sur clique du bouton Delete 
  onDelete() {
    if(confirm('Etes-vous sûr de vouloir supprimer ce post ?')) {
      this.postsService.removePost(this.unPost);
    } else {
      return null;
    }   
  }

  // Sur clique du bouton Edit 
  onEdit(id : string) {
      if(confirm('Etes-vous sûr de vouloir edit ce post ?')) {
        this.router.navigateByUrl("/NewPost/" + id);
      } else {
        return null;
      }   
    }
}