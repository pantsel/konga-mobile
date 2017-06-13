import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConnectionPage } from '../connection/connection'
import { ConnectionsPage } from '../connections/connections'
import { ConnectionEditPage } from '../connection-edit/connection-edit'

/**
 * Generated class for the ConnectionDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-connection-details',
  templateUrl: 'connection-details.html',
})
export class ConnectionDetailsPage {

  connection : any;
  tab1Root = ConnectionEditPage
  tab2Root = ConnectionsPage

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.connection = navParams.get("item")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionDetailsPage');

  }

}
