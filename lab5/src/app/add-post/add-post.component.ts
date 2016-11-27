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
  profile: any;

  constructor(
    private foodPostService: FoodPostService,
    private auth: Auth
  ) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    console.log(this.profile);
  }

  ngOnInit() {
  }
  
  private model = new Post("", "", "", "", "");
  private image; 
  p

  submitted = false;
  
  postFood() {
    this.submitted = true
    let postOperation: Observable<Post[]>;

    // Create a new food post
    postOperation = this.foodPostService.addFoodPost(
      new Post(this.model.name, this.model.price, this.model.expiryDate, this.model.description, this.image));

    // Subscribe to Observable
    postOperation.subscribe( 
      posts => {
        this.model = new Post("", "", "", "", "");    
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
