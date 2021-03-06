import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { Auth } from  './auth.service';

import { AppComponent } from './app.component';
import { FoodPostComponent } from './food-post/food-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { DmcaComponent } from './dmca/dmca.component';
import { TakedownComponent } from './takedown/takedown.component';

const appRoutes: Routes = [
  { path: '', component: FoodPostComponent },
  { path: 'addPost', component: AddPostComponent },
  { path: 'foodDetail/:id', component:FoodDetailComponent },
  { path: 'editPost/:id', component:EditPostComponent },
  { path: 'favourites/:userID', component:FavouritesComponent },
  { path: 'privacy', component:PrivacyComponent },
  { path: 'dmca', component:DmcaComponent },
  { path: 'takedown', component:TakedownComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FoodPostComponent,
    AddPostComponent,
    FoodDetailComponent,
    EditPostComponent,
    FavouritesComponent,
    PrivacyComponent,
    DmcaComponent,
    TakedownComponent
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
