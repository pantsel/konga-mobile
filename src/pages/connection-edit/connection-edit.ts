import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Connection } from '../../providers/connection';

/**
 * Generated class for the ConnectionEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-connection-edit',
  templateUrl: 'connection-edit.html',
})
export class ConnectionEditPage {

  formErrors : any = {};
  errorMessage : string;
  form : FormGroup;
  submitAttempt: boolean = false;

  connection : any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl : LoadingController,
              public connectionProvider : Connection, fb : FormBuilder, public toastCtrl : ToastController) {

    this.form = fb.group({
      name: ['', Validators.compose([ Validators.required])],
      kong_admin_url: ['', Validators.compose([Validators.required])],
      kong_api_key: [''],
    });

    this.connection = this.navParams.data


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionEditPage');
  }

  ionViewDidEnter() {


  }


  updateConnection() {

    this.submitAttempt = true;

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present()

    this.connectionProvider.update(this.connection.id,this.connection)
        .then(updated => {
          loading.dismiss();
          this.showToast("Connection details updated successfully!")
        }, err => {

          this.handleError(err);
          loading.dismiss();
        })
  }


  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  handleError(err) {
    var jsonError = err.json()
    console.log("CONNECTION CREATE ERR =>",jsonError)


    if(jsonError.Errors) {

      for(let key in jsonError.Errors) {
        this.formErrors[key] = jsonError.Errors[key][0].message
      }

    }else{
      this.errorMessage = "An unknown error occured";
    }

  }
}
