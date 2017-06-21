import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConsumerDetailsPage } from "../consumer-details/consumer-details";
import { ConsumerGroupsPage } from "../consumer-groups/consumer-groups";
import { ConsumerCredentialsPage } from "../consumer-credentials/consumer-credentials";

/**
 * Generated class for the ConsumerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-consumer',
  templateUrl: 'consumer.html',
})
export class ConsumerPage {

  data : any;
  tab1Root = ConsumerDetailsPage
  tab2Root = ConsumerGroupsPage
  tab3Root = ConsumerCredentialsPage

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.data = {
      item : this.navParams.get("item")
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsumerPage');
  }

}
