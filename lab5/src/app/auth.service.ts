import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var Auth0: any;
// let Auth0 = require('auth0-lock').default;

@Injectable()
export class Auth {
  // Configure Auth0
  auth0 = new Auth0({
    domain: 'henrytran.auth0.com',
    clientID: 'lZPYvZOMyrvgHwO5M7fk08MnOF5vYsVh',
    responseType: 'token',
    callbackURL: 'http://localhost:8080/'
  });

  constructor(private router: Router) {
    var result = this.auth0.parseHash(window.location.hash);

    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
      this.router.navigate(['/']);
    } else if (result && result.error) {
      alert('error: ' + result.error);
    }
  }

  public login(username, password) {
    this.auth0.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  };

  public register(username, password) {
    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password,
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  };

  public googleLogin() {
    this.auth0.login({
      connection: 'google-oauth2'
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  };
}