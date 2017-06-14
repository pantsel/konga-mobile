import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Events, ModalController } from 'ionic-angular';
import { User } from '../../providers/user'
import {MainPage} from "../main/main";
import * as _ from 'lodash';

/**
 * Generated class for the DefaultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-default-list',
  templateUrl: 'default-list.html',
})
export class DefaultListPage extends MainPage{

  items : any;
  user : any;
  provider : any;
  busy : boolean = false;
  refresher : any;
  pages : any;
  params : {sort : string} = {sort : 'createdAt DESC'}

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authUser : User,
              public toastCtrl : ToastController,
              public alertCtrl : AlertController,
              public events : Events,
              public modalCtrl: ModalController
              ) {

    super(navCtrl,navParams,authUser,events,modalCtrl)

    this.events.subscribe('items:updated', () => {
      this.loadItems();
    });

    this.events.subscribe('user:updated', (user, time) => {
      console.log('user:updated', user, 'at', time);

      this.user = user;
    });



  }

  setProvider(provider) {
    this.provider = provider;
  }

  setPages(pages : any) {
    this.pages = pages;
  }

  ionViewDidLoad() {
    super.ionViewDidLoad();

    console.log('ionViewDidLoad DefaultPage');


  }


  ionViewWillLeave() {

    super.ionViewWillLeave()

    // Unsubscribe from user events
    // this.events.unsubscribe('user:updated')

  }


  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.loadItems();
  }



  loadItems() {

    this.busy =true;

    this.provider.load(_.merge({},this.params)).then((items) => {

      console.log("DEFAULT PAGE : loadItems",items)
      this.items = items;
      if(this.refresher) this.refresher.complete();
      this.busy = false;

    }, (err) => {
      this.showToast("Failed to load connections. Make sure you are connected to the internet.")
      this.busy = false;
    });
  }


  delete(item) {


    let alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: 'Do you want delete this connection?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.provider.delete(item.id).then((ok) => {

              this.loadItems();

            }, (err) => {
              let toast = this.toastCtrl.create({
                message: err.message,
                duration: 3000,
                position: 'top'
              });
              toast.present();
            });
          }
        }
      ]
    });
    alert.present();

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

  createItem() {
    this.navCtrl.push(this.pages.create)
  }


  showItem(item) {
    this.navCtrl.push(this.pages.show,{
      item : item
    })
  }

}
