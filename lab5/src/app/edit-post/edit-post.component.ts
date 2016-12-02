import { Component, OnInit } from '@angular/core';
import { FetchedPost } from '../FetchedPost';
import { FoodPostService } from '../food-post.service';
import { Observable } from 'rxjs/Rx';
import{ ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  providers: [FoodPostService]
})
export class EditPostComponent implements OnInit {

  private foodID: string;
  post: FetchedPost;
  
  constructor(
    private foodPostService: FoodPostService,
    private router: Router,
    route: ActivatedRoute 
  ) {
    this.foodID = route.snapshot.params['id'];
   }

  ngOnInit() {
    this.loadPost();
  }

  loadPost() {
    this.foodPostService.getFoodPost(this.foodID)
      .subscribe(
        post => this.post = post,  
        err => {
          console.log(err);
        }
      )
  }

  submitPost() {

  }
}
