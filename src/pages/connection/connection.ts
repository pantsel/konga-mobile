import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Connection } from '../../providers/connection';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * Generated class for the ConnectionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-connection',
  templateUrl: 'connection.html',
})
export class ConnectionPage {

  formErrors : any = {};
  errorMessage : string;
  form : FormGroup;
  submitAttempt: boolean = false;

  connection : { name: string, kong_admin_url: string, kong_api_key: string } = {
    name: '',
    kong_admin_url: '',
    kong_api_key: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl : LoadingController,
              public connectionProvider : Connection, fb : FormBuilder) {

    this.form = fb.group({
      name: ['', Validators.compose([ Validators.required])],
      kong_admin_url: ['', Validators.compose([Validators.required])],
      kong_api_key: [''],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionPage');
  }


  createConnection() {

    // this.clearErrors();


    this.submitAttempt = true;

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present()

    this.connectionProvider.create(this.connection)
        .then(res => {
          console.log("CONNECTION CREATED =>",res)
          this.navCtrl.pop()
          loading.dismiss();
        }, err => {
          this.handleError(err);
          loading.dismiss();
        })

  }


  clearErrors() {
    this.errorMessage = "";
    this.formErrors = {}
  }


  handleError(err) {
    var jsonError = err.json()
    console.log("CONNECTION CREATE ERR =>",jsonError)


    if(jsonError.Errors) {

      for(let key in jsonError.Errors) {
        this.formErrors[key] = jsonError.Errors[key][0].message
      }

      console.log("!!!!!!!!!!!!!!!!!!!",this.formErrors)
    }else{
      this.errorMessage = "An unknown error occured";
    }

  }


}
