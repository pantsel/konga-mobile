import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ConsumerProvider } from "../../providers/consumer/consumer";

/**
 * Generated class for the ConsumerDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-consumer-details',
  templateUrl: 'consumer-details.html',
})
export class ConsumerDetailsPage {

  formErrors : any = {};
  errorMessage : string;
  form : FormGroup;
  item : any;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public provider : ConsumerProvider,
              public toastCtrl : ToastController,
              fb : FormBuilder) {

    this.item = navParams.get("item") || {};

    this.form = fb.group({
      username  : ['', Validators.compose([ Validators.required])],
      custom_id : [''],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsumerDetailsPage');
  }

  save() {
    this.submitAttempt = true;
    this.item.id ? this.update() : this.create();

  }


  update() {
    this.provider.update(this.item.id,this.item)
        .then(updated => {

          this.showToast(this.provider.name + " updated successfully!")
        }, err => {
          console.log("FAILED TO UPDATE ITEM => ",err)
        })
  }

  create() {
    this.provider.create(this.item)
        .then(created => {
          this.showToast(this.provider.name +  " created successfully!")
          this.navCtrl.pop();
        }, err => {
          console.log("FAILED TO CREATE ITEM => ",err.json())
          this.handleError(err.json());
        })
  }

  handleError(err) {
    if(err.message) {
      this.showToast(err.message)
    }else{

      let errors = [];
      Object.keys(err.body).forEach(key => {
        errors.push(err.body[key])
      })

      this.showToast(errors.join("\x0A"))
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

}
