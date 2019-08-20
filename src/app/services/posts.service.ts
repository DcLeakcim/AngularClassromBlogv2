import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { post } from '../models/post.model';
import { Guid } from 'guid-typescript';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot; 
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { 
    this.getPosts();
  }

  posts: post[] = [];
  postsSubject = new Subject<post[]>();

  emitPosts() {
    this.postsSubject.next(this.posts);
  }

  savePosts() {
    firebase.database().ref('/Posts').set(this.posts);   
  }

  savePost(newPost: post) {
    var index = this.posts.findIndex(x => x.identifiant == newPost.identifiant);
    if ( index== -1)
    {
      this.posts.push(newPost);
    }else{
      this.posts[index]= newPost;
    }
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: post) {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

  getPosts() {
    firebase.database().ref('/Posts')
       .on('value', (data: DataSnapshot) => {
          this.posts = data.val() ? data.val() : [];
          this.emitPosts();
         }
       );
  }

  getSinglePost(id: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/Posts').on('value',
        (data: DataSnapshot) => {
          var obj : post= data.val().filter((post: { identifiant: string; }) => {
            return post.identifiant === id;
          });
          resolve(obj[0]);
         }
       );      
      }
    );
  }
}
