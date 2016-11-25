import { Component, OnInit } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  ngOnInit() {
  }
  
  model = new Post("Food", 25, "2016/11/30", "image");

  submitted = false

  onSubmit() { this.submitted = false};
  
  postFood() {
    this.model = new Post("", "", "", "");
  }
}
