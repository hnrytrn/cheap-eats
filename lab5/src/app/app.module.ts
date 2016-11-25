import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { FoodPostComponent } from './food-post/food-post.component';
import { AddPostComponent } from './add-post/add-post.component';

import { Auth } from  './auth.service';

const appRoutes: Routes = [
  { path: '', component: FoodPostComponent },
  { path: 'addPost', component: AddPostComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FoodPostComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AUTH_PROVIDERS,
    Auth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
