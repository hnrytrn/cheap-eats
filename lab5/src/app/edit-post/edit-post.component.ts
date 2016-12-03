import { Component, OnInit } from '@angular/core';
import { FetchedPost } from '../FetchedPost';
import { FoodPostService } from '../food-post.service';
import { Observable } from 'rxjs/Rx';
import{ ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Auth } from '../auth.service';
import { Post } from '../post'
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  providers: [FoodPostService]
})
export class EditPostComponent implements OnInit {

  private foodID: string;

  constructor(
    private foodPostService: FoodPostService,
    private router: Router,
    private auth: Auth,
    route: ActivatedRoute 
  ) {
    this.foodID = route.snapshot.params['id'];
   }

  post: FetchedPost;
  private image; 
  private retailer = this.auth.userProfile.user_metadata.retailerName;
  private postalCode = this.auth.userProfile.user_metadata.postalCode;
  private address = this.auth.userProfile.user_metadata.address;

  ngOnInit() {
    this.loadPost();
  }

  // Loads the foodpost info from the ID
  loadPost() {
    this.foodPostService.getFoodPost(this.foodID)
      .subscribe(
        post => this.post = post,  
        err => {
          console.log(err);
        }
      )
  }

  // User submits the post to be updated
  submitPost() {
    let putOperation: Observable<Post[]>;
    if (this.image != null) {
      this.post.image = this.image;
    }
    // Update the food post
    putOperation = this.foodPostService.updateFoodPost(
      new FetchedPost(this.post._id, this.post.foodName, this.post.price, this.post.expiryDate, this.post.description, this.image, this.retailer, this.postalCode, this.address)
    );
    putOperation.subscribe(
        posts => {
      },
        err => {
          console.log(err);
        }
      )
  }

  // Listens to when an file gets uploaded
  changeListener($event): void {
    this.readFile($event.target);
  }

  // Reads the image file and gets the base64 encoding
  readFile(inputeValue: any): void {
    var file:File = inputeValue.files[0];
    var reader:FileReader = new FileReader();

    reader.onloadend = (e) => {
      this.image = reader.result;
    }
    reader.readAsDataURL(file);
  }
}
