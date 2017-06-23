import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {Api} from "../../providers/api";

/**
 * Generated class for the ConsumerCredentialsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-consumer-credentials',
    templateUrl: 'consumer-credentials.html',
})
export class ConsumerCredentialsPage {

    schemas: any;
    activeCredential: string = 'basic-auth';
    consumer : any;
    refresher : any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl : AlertController,
                public toastCtrl : ToastController,
                public api: Api) {

        this.consumer = navParams.get("item");
        this.loadSchemas();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ConsumerCredentialsPage');
    }

    loadSchemas() {
        this.api.get('api/schemas/authentication')
            .then((res: any) => {
                console.log("LOADED AUTHENTICATION SCHEMAS => ", res)
                this.schemas = res.schemas;
                this.fetchData();
                if(this.refresher) this.refresher.complete();
            }, err => {
                console.log("FAILED TO LOAD AUTHENTICATION SCHEMAS => ", err.json())
            })
    }

    fetchData() {

        this.schemas.forEach(item => {
            this.api.get('kong/consumers/' + this.consumer.id + '/' + item.name)
                .then((res: any) => {
                    console.log("LOADED CREDENTIAL DATA : " + item.name, res)
                    this.addSchemaData(item.name,res.data)

                }, err => {
                    console.log("FAILED TO LOAD CREDENTIAL DATA : " + item.name, err.json())
                })
        })
    }

    addSchemaData(name,data) {
        this.schemas.forEach(item => {
            if(item.name == name) {
                item.data = data
            }
        })
    }

    contentChanged(key) {
        this.activeCredential = key
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        this.refresher = refresher;
        this.loadSchemas();
    }

    delete($event,name,id) {
        $event.stopPropagation();

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
                        this.api.delete('kong/consumers/' + this.consumer.id + '/' + name + '/' + id)
                            .then((ok) => {

                                this.loadSchemas();

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

}
