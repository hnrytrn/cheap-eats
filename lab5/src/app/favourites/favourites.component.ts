import { Component, OnInit } from '@angular/core';
import { FetchedPost } from '../fetchedPost';
import { FoodPostService } from '../food-post.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  providers: [FoodPostService]
})
export class FavouritesComponent implements OnInit {
  private userID: string;
  constructor(
    private foodPostService: FoodPostService,
    private router: Router,
    route: ActivatedRoute 
    ) { 
      this.userID = route.snapshot.params['userID'];
    }

  private posts: FetchedPost[];

  ngOnInit() {
    this.loadPosts();
  }

  // Get all food posts from users favourites
  loadPosts() {
    this.posts = [];
    // get users favourites
    this.foodPostService.getFavourites(this.userID)
      .subscribe(
        customer => {
          let favourites = customer.favourites;
          for (var i = 0; i < favourites.length; i++) {
              // Get food posts from each favourite retailer and add it to the posts
              this.foodPostService.getRetailerFoodPost(favourites[i])
                .subscribe( //Array.prototype.push.apply(vegetables, moreVegs);
                  posts => {
                    Array.prototype.push.apply(this.posts, posts);
                  },
                  err => {
                    console.log(err);
                  }
                )
          }
        },
        err => {
          console.log(err);
        } 
      );
    
  }

  onSelect(post: FetchedPost) {
      this.router.navigate(['foodDetail', post._id]);
  }

}
