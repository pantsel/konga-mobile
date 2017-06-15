import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Events, ModalController } from 'ionic-angular';
import { User } from '../../providers/user'
import {MainPage} from "../main/main";
import { Api }    from "../../providers/api";
import * as _ from 'lodash';
import moment from 'moment'
import url from 'url';

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

  originalItems : any;
  next  : string;
  items : any;
  searchText : string = '';
  user : any;
  provider : any = null;
  busy : boolean = false;
  refresher : any;
  pages : any;
  params : object = {}
  moment : any = moment;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authUser : User,
              public toastCtrl : ToastController,
              public alertCtrl : AlertController,
              public events : Events,
              public modalCtrl: ModalController,
              public api : Api
              ) {

    super(navCtrl,navParams,authUser,events,modalCtrl)

  }

  setProvider(provider) {
    this.provider = provider;
  }

  setPages(pages : any) {
    this.pages = pages;
  }

  ionViewDidLoad() {
    super.ionViewDidLoad();
    console.log('ionViewDidLoad DefaultListPage');
  }


  ionViewWillLeave() {

    super.ionViewWillLeave()

    // Unsubscribe from user events
    this.events.unsubscribe('items:updated')

  }

  ionViewWillEnter() {

    super.ionViewWillEnter()

    this.events.subscribe('items:updated', () => {
      this.loadItems();
    });


  }


  ionViewDidEnter() {
    super.ionViewDidEnter();
    this.loadItems();
  }



  loadItems() {

    if(!this.provider) return;

    this.busy =true;

    this.provider.load(_.merge({},this.params)).then(response => {

      console.log("DEFAULT PAGE : loadItems",response)
      let items = response.data || response;
      this.next = response.next;
      this.originalItems = this.items = items;
      if(this.refresher) this.refresher.complete();
      this.busy = false;

    }, (err) => {
      this.showToast("Failed to load items. Make sure you are connected to the internet.")
      this.busy = false;
    });
  }

  doInfinite(infiniteScroll) {

    if(!this.next) {
      infiniteScroll.complete();
      return;
    }

    let nexQuery = url.parse(this.next).query

    this.busy =true;
    this.api.getCustom(this.api.url + "/" + this.provider.url + "?" + nexQuery)
        .then((response:any) => {


          let items = response.data || response;
          this.next = response.next;
          this.originalItems = this.items = this.originalItems.concat(items);
          if(this.refresher) this.refresher.complete();
          this.busy = false;
          infiniteScroll.complete();
        })


  }

  filterItems(searchText,property? : string){
    return this.originalItems.filter((item) => {
      return item[property || 'name'].toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });

  }

  setFilteredItems() {
    this.items = this.filterItems(this.searchText);
  }


  delete($event,item) {

    $event.stopPropagation();

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
    if(this.pages.create)
     this.navCtrl.push(this.pages.create)
  }


  showItem(item) {
    if(this.pages.show)
      this.navCtrl.push(this.pages.show,{
        item : item
      })
  }

}
