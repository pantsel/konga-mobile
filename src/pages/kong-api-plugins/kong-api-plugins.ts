import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, Events, AlertController  } from 'ionic-angular';
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
              public alertCtrl: AlertController,
              public kongApiProvider : KongApiProvider) {

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

    this.kongPluginsProvider.list()
        .then((res:any) => {
          let initialGroups = res;

          console.log("LIST PLUGINS INITIAL GROUPS", initialGroups);


          // Load api plugins
          if(this.api) {
            this.kongApiProvider.listPlugins(this.api.id)
                .then((res : any) => {
                  this.api.plugins = res.data
                  this.addGroupsData(initialGroups);
                  this.busy = false;
                  if(this.refresher) this.refresher.complete();
                }, err => {
                  console.log("FAILED TO LOAD API PLUGINS => ", err)
                  this.showToast("Failed to load api plugins")
                  this.busy = false;
                  if(this.refresher) this.refresher.complete();
                })
          }else{
            this.addGroupsData(initialGroups);
            this.busy = false;
            if(this.refresher) this.refresher.complete();
          }

        }, err => {
          console.log("FAILED TO LOAD PLUGINS => ", err)
          this.showToast("Failed to load plugins")
          this.busy = false;
          if(this.refresher) this.refresher.complete();
        })
  }


  addGroupsData(initialGroups) {

    initialGroups.forEach(group => {
      for(let key of Object.keys(group.plugins)) {

        // Check if plugin is added to api
        let apiPlugin = this.getApiPlugin(key);
        if (apiPlugin) {
          group.plugins[key].added = true;
          group.plugins[key] = _.merge(group.plugins[key], {
            apiPlugin: apiPlugin
          });

        }
      }
    })

    this.groups = initialGroups


  }

  getApiPlugin(pluginName) {
    if(!this.api || !this.api.plugins) return null;

    for(let i=0; i<this.api.plugins.length;i++) {
      let plugin = this.api.plugins[i];
      if(plugin.name === pluginName) {
        return plugin;
      }
    }


    return null;

  }


  onItemSelected(item) {

    let modal = this.modalCtrl.create(KongPluginPage,{
      api : this.api,
      action : this.getApiPlugin(item.key) ? 'update' : 'create',
      pluginName : item.key,
      pluginCustomData : item.value.customData
    })

    modal.onDidDismiss(data => {
      console.log("MODAL DISSMISSED =>", data);
      if(data && data.update) {
        this.loadItems();
      }
    });

    modal.present();

  }

  removePlugin($event,plugin) {
    $event.stopPropagation();


    let confirm = this.alertCtrl.create({
      title: 'Confirm Action',
      message: 'Really want to remove the selected plugin?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.kongApiProvider.removePlugin(this.api.id,plugin.id)
                .then(res =>{
                  this.showToast("Plugin removed successfully!")
                  this.loadItems();
                }, err => {
                  console.log("FAILED TO REMOVE PLUGIN",err)
                  this.showToast("Failed to remove plugin")
                })
          }
        }
      ]
    });
    confirm.present();


    


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
