import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { FoodPostService } from '../food-post.service';
import { Auth } from '../auth.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [FoodPostService, Auth]
})
export class AddPostComponent implements OnInit {
  constructor(
    private foodPostService: FoodPostService,
    private auth: Auth
  ) {}

  ngOnInit() {
  }

  private model = new Post("", "", "", "", "","","","");
  private image; 
  private retailer = this.auth.userProfile.user_metadata.retailerName;
  private postalCode = this.auth.userProfile.user_metadata.postalCode;
  private address = this.auth.userProfile.user_metadata.address;

  submitted = false;
  
  postFood() {
    this.submitted = true
    let postOperation: Observable<Post[]>;
    // Create a new food post
    postOperation = this.foodPostService.addFoodPost(
      new Post(this.model.foodName, this.model.price, this.model.expiryDate, this.model.description, this.image, this.retailer, this.postalCode, this.address));

    // Subscribe to Observable
    postOperation.subscribe( 
      posts => {
        this.model = new Post("", "", "", "", "","","","");    
        this.image = null;
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
