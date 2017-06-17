import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, Events } from 'ionic-angular';
import { KongPluginsProvider } from '../../providers/kong-plugins/kong-plugins';
import { KeysPipe } from '../../pipes/keys/keys';
import { KongApiProvider } from '../../providers/kong-api/kong-api';
import * as _ from 'lodash';
import {KongPluginPage} from "../kong-plugin/kong-plugin";

/**
 * Generated class for the KongApiPluginsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-kong-api-plugins',
  templateUrl: 'kong-api-plugins.html',
})
export class KongApiPluginsPage {

  plugins : any;
  groups  : any;
  api : any;
  busy : boolean = false;
  refresher : any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl : ToastController,
              public modalCtrl : ModalController,
              public keys : KeysPipe,
              public events : Events,
              public kongPluginsProvider : KongPluginsProvider,
              public KongApiProvider : KongApiProvider) {

    this.api = navParams.get("item");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KongApiPluginsPage');
  }


  ionViewDidEnter() {
    this.busy = true;
    this.loadItems();

  }

  loadItems() {

    this.kongPluginsProvider.listEnabled()
        .then((res : any) => {
          console.log("LOAD PLUGINS => ", res);
          this.plugins = res.enabled_plugins;

          // Load api plugins
          if(this.api) {
            this.KongApiProvider.listPlugins(this.api.id)
                .then((res : any) => {
                  this.api.plugins = res.data
                  this.makeGroups(this.plugins);
                  this.busy = false;
                  if(this.refresher) this.refresher.complete();
                }, err => {
                  console.log("FAILED TO LOAD API PLUGINS => ", err)
                  this.showToast("Failed to load api plugins")
                  this.busy = false;
                  if(this.refresher) this.refresher.complete();
                })
          }


        }, err => {
          console.log("FAILED TO LOAD PLUGINS => ", err)
          this.showToast("Failed to load plugins")
          this.busy = false;
          if(this.refresher) this.refresher.complete();
        })
  }


  makeGroups(_enabledPlugins) {

    let _groups = this.kongPluginsProvider.groups();
    let enabledPlugins = _.clone(_enabledPlugins);

    _groups.forEach(group => {
      for(let key of Object.keys(group.plugins)) {

        var index = enabledPlugins.indexOf(key);
        if(index > -1) {
          group.plugins[key].enabled = true; // Mark plugin as enabled so it will be shown in the list
          enabledPlugins.splice(index, 1); // Remove found plugin from array

          // Check if plugin is added to api
          if(this.isPluginAdded(key)) {
            group.plugins[key].added = true;
          }else{
            group.plugins[key].added = false;
          }
        }
      }
    })

    // If there are any enabledPlugins left,
    // add them to the custom plugins group
    if(enabledPlugins.length) {
      enabledPlugins.forEach(plugin => {
        _groups[_groups.length - 1].plugins[plugin] = {}
      })
    }

    this.groups = _groups;

  }

  isPluginAdded(pluginName) : boolean {

    if(!this.api || !this.api.plugins) return false;

    let found = false;

    this.api.plugins.forEach(plugin => {
      if(plugin.name === pluginName) {
        found = true;
      }
    })

    return found;

  }


  onItemSelected(item) {

    let modal = this.modalCtrl.create(KongPluginPage,{
      api : this.api,
      action : this.isPluginAdded(item.key) ? 'update' : 'create',
      pluginName : item.key
    })

    modal.onDidDismiss(data => {
      console.log("MODAL DISSMISSED =>", data);
      if(data && data.update) {
        this.loadItems();
      }
    });

    modal.present();

  }


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.refresher = refresher;
    this.loadItems()
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
