import { Component, OnInit } from '@angular/core';
import { FetchedPost } from '../FetchedPost';
import { FoodPostService } from '../food-post.service';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Auth } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css'],
  providers: [FoodPostService]
})
export class FoodDetailComponent implements OnInit {

  private foodID: string;
  post: FetchedPost;
  user: User;
  private userID;

  constructor(
    private foodPostService: FoodPostService,
    private router: Router,
    private auth: Auth,
    route: ActivatedRoute 
  ) { 
    this.foodID = route.snapshot.params['id'];
    if (this,auth.userProfile != null) {
      this.userID = this.auth.userProfile.user_id;
    }
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
    if (this.auth.userProfile != null) {
      let userMetadata = this.auth.userProfile.user_metadata
      if (userMetadata != null && this.auth.userProfile.email == this.post.email) {
        return true;
      }
    }
    return false;
  }

  // Favourite retailer clicked
  favourite() {
    // Check if user is already has favourites stored in the db  
    let user;
    this.foodPostService.getFavourites(this.userID)
      .subscribe(
        customer => user = customer,
        err => {
          console.log(err);
        } 
      );
      console.log(user);
    if (user == null) {
      this.foodPostService.addUser({_id: this.userID})
        .subscribe(
          customer => {},
          err => {
            console.log(err);
          }
      )
    }
    
    // Add the retailers email to the users favourites
    this.foodPostService.addRetailer({_id: this.userID, email: this.post.email})
      .subscribe(
        customer => {},
        err => {
          console.log(err);
        }
      )
  }

  // User purchases an item
    openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_oXYVZ0IbatsHhufD89CNy7vk',
      locale: 'auto',
      token: function (token: any) {
        
      }
    });

    handler.open({
      name: this.post.foodName,
      description: this.post.description,
      amount: this.post.price*100
    });

  }
}
