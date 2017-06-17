import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {KongApiEditPage} from "../kong-api-edit/kong-api-edit";
import {KongApiPluginsPage} from "../kong-api-plugins/kong-api-plugins";
import {KongApiHealthChecksPage} from "../kong-api-health-checks/kong-api-health-checks";

/**
 * Generated class for the KongApiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kong-api',
  templateUrl: 'kong-api.html',
})
export class KongApiPage {


  data : any;
  tab1Root = KongApiEditPage
  tab2Root = KongApiPluginsPage
  tab3Root = KongApiHealthChecksPage


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.data = {
      item : this.navParams.get("item")
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KongApiPage');
  }

}
