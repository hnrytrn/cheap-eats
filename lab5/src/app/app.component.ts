import { Component } from '@angular/core';
import { Auth } from  './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    private auth: Auth
  ) {}

  // Check if the user is a retailer
  isRetailer(): boolean {
    let userMetadata = this.auth.userProfile.user_metadata
    if (userMetadata != null && userMetadata.retailerName != null) {
      return true;
    }
    return false;
   }

   // Favourites button is clicked
   favourites() {
     this.router.navigate(['favourites', this.auth.userProfile.user_id])
   }
}
