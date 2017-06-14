import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Events } from 'ionic-angular';
import { Connection } from '../../providers/connection';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Api } from '../../providers/api';
import { User } from '../../providers/user'

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
  isModal : boolean = false;
  setConnectionAsDefaultAfterCreate : boolean = false;

  connection : { name: string, kong_admin_url: string, kong_api_key: string } = {
    name: '',
    kong_admin_url: '',
    kong_api_key: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl : LoadingController,
              public toastCtrl : ToastController,
              public authUser : User,
              public api : Api,
              public events : Events,
              public connectionProvider : Connection, fb : FormBuilder) {

    this.form = fb.group({
      name: ['', Validators.compose([ Validators.required])],
      kong_admin_url: ['', Validators.compose([Validators.required])],
      kong_api_key: [''],
    });

    this.isModal = navParams.get("isModal") || false;
    this.setConnectionAsDefaultAfterCreate = navParams.get("setConnectionAsDefaultAfterCreate") || false;
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

    if(!this.setConnectionAsDefaultAfterCreate) {
      this.connectionProvider.create(this.connection)
          .then(res => {
            console.log("CONNECTION CREATED =>",res)
            this.navCtrl.pop()
            loading.dismiss();
          }, err => {
            this.handleError(err);
            loading.dismiss();
          })
    }else{

      // Check connectivity first
      this.api.get('kong',{
        kong_admin_url : this.connection.kong_admin_url,
        kong_api_key   : this.connection.kong_api_key
      }).then(response => {
        console.log("Check connection:success",response)

        // Create Connection
        this.connectionProvider.create(this.connection)
            .then(res => {
              console.log("CONNECTION CREATED =>",res)


              this.authUser.update({
                node : res
              }).then(user=>{


                this.events.publish("items:updated")
                this.navCtrl.pop()
                loading.dismiss();

              }, err=>{
                this.showToast("Failed to update connection")
                loading.dismiss();
              })

            }, err => {
              this.handleError(err);
              loading.dismiss();
            })

      }, error =>{
        loading.dismiss();
        this.showToast(error.message || "Oh snap! Can't connect to " + this.connection.kong_admin_url)
      })

    }



  }


  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
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

  close() {
    this.navCtrl.pop()
  }


}
