import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { KongApiProvider } from "../../providers/kong-api/kong-api";

/**
 * Generated class for the KongApiEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kong-api-edit',
  templateUrl: 'kong-api-edit.html',
})
export class KongApiEditPage {

  formErrors : any = {};
  errorMessage : string;
  form : FormGroup;
  item : any;
  submitAttempt: boolean = false;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public provider : KongApiProvider,
              public toastCtrl : ToastController,
              fb : FormBuilder) {


    this.item = navParams.get("item");

    this.form = fb.group({
      name: ['', Validators.compose([ Validators.required])],
      hosts: [''],
      uris: [''],
      methods: [''],
      upstream_url: ['', Validators.compose([ Validators.required])],
      strip_uri: [true],
      preserve_host: [''],
      retries: [5],
      upstream_connect_timeout: [60000],
      upstream_send_timeout: [60000],
      upstream_read_timeout: [60000],
      https_only: [false],
      http_if_terminated: [true],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KongApiEditPage');
  }


  update() {
    this.submitAttempt = true;

    this.provider.update(this.item.id,this.item)
        .then(updated => {

          this.showToast("API updated successfully!")
        }, err => {
          console.log("FAILED TO UPDATE API => ",err)
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

}
