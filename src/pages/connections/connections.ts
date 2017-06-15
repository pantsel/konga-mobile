import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Events, ModalController  } from 'ionic-angular';
import { Connection } from '../../providers/connection';
import { User } from '../../providers/user'
import { Api } from '../../providers/api';
import {ConnectionPage} from "../connection/connection";
import {ConnectionDetailsPage} from "../connection-details/connection-details";
import {DefaultListPage} from "../default-list/default-list";

/**
 * Generated class for the ConnectionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-connections',
  templateUrl: 'connections.html',
})
export class ConnectionsPage extends DefaultListPage{


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authUser : User,
              public toastCtrl : ToastController,
              public alertCtrl : AlertController,
              public events : Events,
              public modalCtrl: ModalController,
              public api : Api,
              public connection : Connection
  ) {

    super(navCtrl,navParams,authUser,toastCtrl,alertCtrl,events,modalCtrl,api);

    this.params = {sort : 'createdAt DESC'}
    this.setProvider(connection)
    this.setPages({
      create : ConnectionPage,
      show   : ConnectionDetailsPage
    })



  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NodeHealthChecksPage');
  }

  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.events.subscribe("node:health_checks",data => {


      for(let item of this.items) {
        if(data.node_id == item.id) {
          item.health_check_details = data
        }
      }

    })
  }

  ionViewWillLeave() {
    super.ionViewWillLeave();
    this.events.unsubscribe("node:health_checks")
  }


  toggleActive($event,item) {

    $event.stopPropagation()

    let active = true;
    if(this.isActive(item)) {
      active = false;
    }

    if(!this.isActive(item)) {
      console.log("node not active",item)

      // Check connection before assigning
      // the node to the user
      item.working = true;
      this.api.get('kong',{
        kong_admin_url : item.kong_admin_url,
        kong_api_key   : item.kong_api_key
      }).then(response => {
        console.log("Check connection:success",response)
        item.working = false;

        this.toggleUserConnection(item);

      }, error =>{
        item.working = false;
        this.showToast(error.message || "Oh snap! Can't connect to " + item.kong_admin_url)
      })

    }else{
      console.log("node active")
      this.toggleUserConnection(item)
    }

  }

  isActive(connection) {
    return this.user && this.user.node && this.user.node.id == connection.id
  }


  toggleUserConnection(connection) {
    this.authUser.update({
      node : this.isActive(connection) ? null : connection
    }).then(user=>{

      this.user = user;
      this.showToast(this.user.node ? "Connection activated!" : "Connection deactivated!")

    }, err=>{
      this.showToast("Failed to update connection")
    })

  }


  onDelete($event,item) {
    $event.stopPropagation()

    if(this.isActive(item)) {
      this.showToast("You can't delete an active connection. Deactivate it and try again.")

      return false;
    }

    this.delete($event,item);
  }

}
