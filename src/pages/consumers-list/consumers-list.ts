import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Events, ModalController } from 'ionic-angular';
import {DefaultListPage} from "../default-list/default-list";
import { User } from '../../providers/user'
import { Api } from '../../providers/api'
import {ConsumerProvider} from "../../providers/consumer/consumer";
import { ConsumerDetailsPage } from "../consumer-details/consumer-details";
import { ConsumerPage } from "../consumer/consumer";

/**
 * Generated class for the ConsumersListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-consumers-list',
  templateUrl: 'consumers-list.html',
})
export class ConsumersListPage extends DefaultListPage{

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authUser : User,
              public toastCtrl : ToastController,
              public alertCtrl : AlertController,
              public events : Events,
              public modalCtrl: ModalController,
              public consumerProvider : ConsumerProvider,
              public api : Api
  ) {

    super(navCtrl,navParams,authUser,toastCtrl,alertCtrl,events,modalCtrl,api);

    this.params = {size : 50};
    this.setProvider(consumerProvider)
    this.pages = {
       show : ConsumerPage,
       create : ConsumerDetailsPage
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsumersListPage');
  }

}
