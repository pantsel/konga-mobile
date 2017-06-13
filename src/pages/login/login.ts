import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';

import { User } from '../../providers/user';

import { TranslateService } from '@ngx-translate/core';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { identifier: string, password: string } = {
    identifier: 'admin',
    password: 'adminadminadmin'
  };

  kongaConnectionUrl : string;

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public storage: Storage,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })

    this.storage.get("_kongaConnectionUrl")
        .then(item => {
          this.kongaConnectionUrl = item;
        })


  }

  ionViewCanEnter() {
    return new Promise((resolve, reject) => {
      this.user.isAuthenticated().then((is) => {
        if(is) {
          reject()
        }else{
          resolve();
        }

      }, (err) => {
        reject(err);
      });
    });
  }


  // Attempt to login in through our User service
  doLogin() {

    if(!this.kongaConnectionUrl) {
      this.showToast("You need to define a Konga URL")
      return false;
    }

    // Store the connection URL
    this.storage.set("_kongaConnectionUrl",this.kongaConnectionUrl)


    this.user.login(this.account).then((resp) => {
      let toast = this.toastCtrl.create({
        message: "You have Logged in successfully!",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.setRoot(MainPage);
    }, (err) => {
      // Unable to log in
      this.showToast(this.loginErrorString)
    });
  }



  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


}

