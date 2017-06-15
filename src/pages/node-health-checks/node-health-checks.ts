import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { Connection } from '../../providers/connection';
import moment from 'moment';


/**
 * Generated class for the NodeHealthChecksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-node-health-checks',
  templateUrl: 'node-health-checks.html',
})
export class NodeHealthChecksPage {

  connection : any;
  moment : any = moment;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl : ToastController,
              public events : Events,
              public connectionProvider : Connection) {

    this.connection = this.navParams.data

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NodeHealthChecksPage');
  }

  ionViewDidEnter() {
    this.events.subscribe("node:health_checks",data => {
      if(data.node_id == this.connection.id) {
        this.connection.health_check_details = data
      }
    })
  }


  ionViewDidLeave() {
    this.events.unsubscribe("node:health_checks")
  }

  toggleHealthChecks() {

    console.log("this.connection.health_checks",this.connection.health_checks)

    this.connectionProvider.update(this.connection.id,{
      health_checks : this.connection.health_checks
    }).then(connection =>{
    }, err => {
      console.log("FAILED TO TOGGLE HEALTH CHECKS : ", err)
      this.connection.health_checks = !this.connection.health_checks;
      this.showToast("Failed to toggle Health Checks")
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
