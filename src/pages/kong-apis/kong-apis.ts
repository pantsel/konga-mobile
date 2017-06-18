import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Events, ModalController } from 'ionic-angular';
import {DefaultListPage} from "../default-list/default-list";
import { User } from '../../providers/user'
import { Api } from '../../providers/api'
import {KongApiProvider} from "../../providers/kong-api/kong-api";
import { KongApiPage } from "../kong-api/kong-api";
import { KongApiEditPage} from "../kong-api-edit/kong-api-edit";

/**
 * Generated class for the KongApisPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kong-apis',
  templateUrl: 'kong-apis.html',
})
export class KongApisPage extends DefaultListPage{

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authUser : User,
              public toastCtrl : ToastController,
              public alertCtrl : AlertController,
              public events : Events,
              public modalCtrl: ModalController,
              public kongApi : KongApiProvider,
              public api : Api
  ) {

    super(navCtrl,navParams,authUser,toastCtrl,alertCtrl,events,modalCtrl,api);

    this.params = {size : 50};
    this.setProvider(kongApi)
    this.pages = {
      show : KongApiPage,
      create : KongApiEditPage
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KongApisPage');
  }

}
