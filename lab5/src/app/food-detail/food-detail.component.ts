import { Component, OnInit } from '@angular/core';
import { FetchedPost } from '../FetchedPost';
import { FoodPostService } from '../food-post.service';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Auth } from '../auth.service';

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
    private auth: Auth,
    route: ActivatedRoute 
  ) { 
    this.foodID = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadPost();
  }
  
  // Load food post from foodID
  loadPost() {
    this.foodPostService.getFoodPost(this.foodID)
      .subscribe(
        post => this.post = post,  // Bind to view
        err => {
          console.log(err);
        }
      )
  }

  // User chooses to edit food post
  edit() {
    this.router.navigate(['editPost', this.foodID]);
  }
  
  // User deletes food post
  delete() {
    this.foodPostService.removeFoodPost(this.foodID)
      .subscribe(
        err => {
          console.log(err);
        }
      )
  }

  // Determines if the current user is the creator of this post
  isCreator(): boolean {
    let userMetadata = this.auth.userProfile.user_metadata
    if (userMetadata != null && userMetadata.retailerName == this.post.retailer) {
      return true;
    }
    return false;
  }
}
