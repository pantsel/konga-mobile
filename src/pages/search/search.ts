import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import moment from 'moment';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  moment : any = moment;
  currentItems: any = [];
  provider : any;
  callback : any;
  items : any = [];
  filteredItems : any = [];
  busy  : boolean = false;
  searchText : string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl : ToastController) {

    this.provider = this.navParams.get("provider")

  }

  ionViewWillEnter() {
    this.callback = this.navParams.get("callback")
  }

  ionViewDidEnter() {
    this.loadItems();
  }


  loadItems() {

    if(!this.provider) return;

    this.busy =true;

    this.provider.load({}).then(response => {

      console.log("DEFAULT PAGE : loadItems",response)
      let items = response.data || response;
      this.items = items;
      this.filteredItems = this.setFilteredItems();
      this.busy = false;

    }, (err) => {
      this.showToast("Failed to load items. Make sure you are connected to the internet.")
      this.busy = false;
    });
  }


  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  filterItems(searchText){
    return this.items.filter((item) => {

      let conditions = this.provider.searchFields.filter(sf => {
        return item[sf] && item[sf].toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      })

      return conditions.length > 0;


    });

  }


  setFilteredItems() {
    if(!this.searchText) {
      this.filteredItems = []
    }else{
      this.filteredItems = this.filterItems(this.searchText);
    }
  }


  onSelectItem(item) {

    // this.navCtrl.pop();
    this.callback(item)

  }





}
