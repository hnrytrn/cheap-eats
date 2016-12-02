import { Component, OnInit } from '@angular/core';
import { FetchedPost } from '../FetchedPost';
import { FoodPostService } from '../food-post.service';
import { Observable } from 'rxjs/Rx';
import{ ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css'],
  providers: [FoodPostService]
})
export class FoodDetailComponent implements OnInit {

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
        post => this.post = post,  // Bind to view
        err => {
          console.log(err);
        }
      )
  }

  edit() {
    this.router.navigate(['editPost', this.foodID]);
  }

  delete() {
    
  }
}
