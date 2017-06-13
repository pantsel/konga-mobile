import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default-list, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public http: Http, public api: Api, public storage: Storage,public events: Events) {
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {


      return this.api.post('login', accountInfo)
          .then(res => {
              this._loggedIn(res);

          }, err => {
              console.error('ERROR', err);
          })


  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {


      return this.api.post('signup', accountInfo)
          .then(res => {
              this._loggedIn(res);

          }, err => {
              console.error('ERROR', err);
          })

  }

  isAuthenticated() {
    return this.storage.get("_token")
        .then(token => {
          return token ? true : false;
        });
  }

  getToken() {
    return this.storage.get("_token")
        .then(token => {
          return token;
        });
  }

  getUser() {
    return this.storage.get("_user")
        .then(user => {
          return user;
        });
  }

  setUser(user) {
      this.storage.set("_user",user)
  }

  update(data) {

      return this.storage.get("_user")
          .then(user => {
              return this.api.put('api/user/' + user.id,data)
                  .then(user => {

                      if(user[0].node) {
                          return this.api.get('api/kongnode/' + user[0].node)
                              .then(node => {
                                  user[0].node = node;
                                  this.storage.set("_user",user[0])
                                  this.events.publish('user:updated', user[0], Date.now());
                                  return user[0];

                              }, err => {
                                  return err;
                              })
                      }else{
                          this.events.publish('user:updated', user[0], Date.now());

                          return user[0]
                      }


                  }, err => {
                      return err;
                  })
          })



  }


  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    this.storage.remove("_token");
    this.storage.remove("_user");
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
    this.storage.set('_user', resp.user);
    this.storage.set('_token', resp.token);
  }
}
