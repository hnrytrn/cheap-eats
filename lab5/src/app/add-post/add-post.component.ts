import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { FoodPostService } from '../food-post.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [FoodPostService]
})
export class AddPostComponent implements OnInit {

  constructor(
    private foodPostService: FoodPostService
  ) {}

  ngOnInit() {
  }
  
  private model = new Post("", "", "", "", "");
  private image; 

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

  changeListener($event): void {
    this.readFile($event.target);
  }

  readFile(inputeValue: any): void {
    var file:File = inputeValue.files[0];
    var reader:FileReader = new FileReader();

    reader.onloadend = (e) => {
      this.image = reader.result;
    }
    reader.readAsDataURL(file);
  }
}
