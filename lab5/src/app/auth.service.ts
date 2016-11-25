import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
let Auth0Lock = require('auth0-lock').default;

// Lock customization
var options = {
  allowedConnections: ['Username-Password-Authentication'],
  
  // Sign up fields
  additionalSignUpFields: [{
    name: "retailerName",
    placeholder: "Enter the name of your store",
  },
  {
    name: "address",
    placeholder: "Enter the address of your store"
  },
  {
    name: "postalCode",
    placeholder: "Enter the postal code of your store",
    validator: function(postalCode) {
      return {
        valid: postalCode.length == 6,
        hint: "Postal code must be in the form \"A1A1A1\""
      };
    }
  }]
};

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('lZPYvZOMyrvgHwO5M7fk08MnOF5vYsVh', 'henrytran.auth0.com', options);

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
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