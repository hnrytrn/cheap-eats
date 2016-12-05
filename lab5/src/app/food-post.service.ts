import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Post } from './post';
import { User } from './user';
import { FetchedPost } from './fetchedPost';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map' ;
import 'rxjs/add/operator/catch' ;

@Injectable()
export class FoodPostService {

  constructor(private http: Http) { }
  private foodPostsUrl = '/api/foodPost';
  private retailerFoodPostsUrl = '/api/retailerFoodPost';
  private userUrl = "/api/user";
  private favouritesUrl = "/api/favouriteRetailers"

  // Get all food posts
  getFoodPosts(): Observable<FetchedPost[]> {
    return this.http.get(this.foodPostsUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Add a new food post
  addFoodPost(body: Object): Observable<Post[]> {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.foodPostsUrl, body, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Update a food post
  updateFoodPost(body: Object): Observable<Post[]> {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.put(`${this.foodPostsUrl}/${body['_id']}`, body, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Delete a food post
  removeFoodPost (id:string): Observable<Post[]> {
    return this.http.delete(`${this.foodPostsUrl}/${id}`) 
    .map((res:Response) => res.json()) 
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
  }   

  // Get specific food post
  getFoodPost(id:string): Observable<FetchedPost> {
    return this.http.get(`${this.foodPostsUrl}/${id}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Get food posts from a specific retailer
  getRetailerFoodPost(email:string): Observable<FetchedPost> {
    return this.http.get(`${this.retailerFoodPostsUrl}/${email}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  //Get users data
  getFavourites(id:string): Observable<User> {
    return this.http.get(`${this.favouritesUrl}/${id}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Add retailer to users favourites
  addRetailer(body: Object): Observable<User> {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.put(`${this.favouritesUrl}/${body['_id']}`, body, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Delete retailer from users favourites
  deleteRetailer(body: Object): Observable<User> {
    return this.http.delete(`${this.favouritesUrl}/${body['_id']}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Add a new user
  addUser(body: Object): Observable<User> {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(`${this.userUrl}/${body['_id']}`, body, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
