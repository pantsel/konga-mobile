import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController  } from 'ionic-angular';
import { ConsumerProvider } from "../../providers/consumer/consumer";
import moment from "moment";

/**
 * Generated class for the ConsumerGroupsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-consumer-groups',
  templateUrl: 'consumer-groups.html',
})
export class ConsumerGroupsPage {

  consumer : any;
  busy : boolean = false;
  refresher : any;
  groups : any;
  moment : any = moment;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public consumerProvider : ConsumerProvider,
              public toastCtrl : ToastController,
              public alertCtrl : AlertController
  ) {

    this.consumer = navParams.get("item");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsumerGroupsPage');
  }

  ionViewDidEnter() {
    this.busy = true;
    this.loadItems();

  }

  loadItems() {

    this.consumerProvider.groups(this.consumer.id)
        .then((res:any) => {


          console.log("Consumer Groups", res);
          this.groups = res.data;
          this.busy = false;
          if(this.refresher) this.refresher.complete();



        }, err => {
          console.log("FAILED TO LOAD CONSUMER GROUPS => ", err)
          this.showToast("Failed to load plugins")
          this.busy = false;
          if(this.refresher) this.refresher.complete();
        })
  }

  addGroup() {
    let prompt = this.alertCtrl.create({
      title: 'Add Group',
      // message: "Enter Group name to add",
      inputs: [
        {
          name: 'name',
          placeholder: 'Enter Group name...'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked',data);
            if(data.name) {

              this.consumerProvider.addGroup(this.consumer.id,data.name)
                  .then(res => {
                    this.loadItems()
                  })
            }
          }
        }
      ]
    });
    prompt.present();
  }


  delete(event,item) {
    let alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: 'Do you want delete this item?',
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
            this.consumerProvider.deleteGroup(this.consumer.id, item.id).then((ok) => {

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

}
