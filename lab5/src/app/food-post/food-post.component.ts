import { Component, OnInit } from '@angular/core';
import { FetchedPost } from '../fetchedPost';
import { FoodPostService } from '../food-post.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-post',
  templateUrl: './food-post.component.html',
  styleUrls: ['./food-post.component.css'],
  providers: [FoodPostService]
})
export class FoodPostComponent implements OnInit {
  constructor(
    private foodPostService: FoodPostService,
    private router: Router
    ) { }

  private posts: FetchedPost[];

  ngOnInit() {
    this.loadPosts();
  }

  // Get all food posts
  loadPosts() {
    this.foodPostService.getFoodPosts()
      .subscribe(
        posts => this.posts = posts,  // Bind to view
        err => {
          console.log(err);
        }
      )
  }

  onSelect(post: FetchedPost) {
      this.router.navigate(['foodDetail', post._id]);
  }

}
