import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { post } from '../models/post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  PostForm: FormGroup;
  id : string;
  post : post;

  constructor(private formBuilder: FormBuilder, 
              private postsService: PostsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    if (this.activatedRoute.snapshot.params["id"] != null)
    {
      this.id = this.activatedRoute.snapshot.params["id"];
      console.log(this.id);
      this.postsService.getSinglePost(this.id).then(
        (post: post) => {
          console.log(post);
          this.post = post;
          this.initValue();
        }
      );    
    }
  }
              
  initForm() {
    this.PostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
  
  initValue() {
    this.PostForm.patchValue({
      title: this.post.title,
      content: this.post.content
    });
  }
      
  onSavePost() {
    const title = this.PostForm.get('title').value;
    const content = this.PostForm.get('content').value; 
    if (this.post == undefined){
      const newPost = new post(title, content, 0);
      this.postsService.savePost(newPost);
    } else {
      this.post.title = title;
      this.post.content = content;
      this.postsService.savePost(this.post);
    }

    this.router.navigate(['/Posts']);
  }
}
