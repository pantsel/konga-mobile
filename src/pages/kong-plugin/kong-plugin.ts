import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController, Events, ToastController} from 'ionic-angular';
import {KongApiProvider} from '../../providers/kong-api/kong-api';
import {KongPluginsProvider} from '../../providers/kong-plugins/kong-plugins';
import {KeysPipe} from '../../pipes/keys/keys';

/**
 * Generated class for the KongPluginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-kong-plugin',
    templateUrl: 'kong-plugin.html',
})
export class KongPluginPage {

    pluginName: string;
    action: string;
    api: any;
    schema: any;
    data : any;

    constructor(public navCtrl: NavController,
                public kongApiProvider: KongApiProvider,
                public keys: KeysPipe,
                public kongPluginsProvider: KongPluginsProvider,
                public viewCtrl: ViewController,
                public events  : Events,
                public toastCtrl : ToastController,
                public alertCtrl: AlertController,
                public navParams: NavParams) {

        this.pluginName = navParams.get("pluginName");
        this.action = navParams.get("action");
        this.api = navParams.get("api");
        this.data = {
            name : this.pluginName,
            config : {}
        }

    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad KongPluginPage');
    }


    ionViewDidEnter() {
        this.kongPluginsProvider.retrieveSchema(this.pluginName)
            .then((res: any) => {
                console.log("RETRIEVE PLUGIN SCHEMA => ", res);

                let schema = res;

                // Assign default values
                Object.keys(schema.fields).forEach(key => {
                    if (schema.fields[key].default !== undefined) {
                        schema.fields[key].value = schema.fields[key].default
                    }

                })

                this.schema = res;
            }, err => {
                console.log("FAILED TO RETRIEVE PLUGIN SCHEMA => ", err);
            })
    }


    save() {
        console.log("SAVE CLICKED =>",this.schema.fields)

        let data = this.data;

        Object.keys(this.schema.fields).forEach(key => {
            if(this.schema.fields[key] && this.schema.fields[key] !== "function") {
                data.config[key] = this.schema.fields[key].value
            }
        })

        console.log("SAVE CLICKED : DATA =>",data)

        if(this.api) {

            this.kongApiProvider.addPlugin(this.api.id,data)
                .then((res:any)=>{

                    let data = { 'update': true };

                    this.closeModal(data)

                }, err => {
                    console.error("FAILED TO ADD PLUGIN",err.json())
                    this.handleError(err.json())
                })
        }
    }

    handleError(err) {
        if(err.message) {
            this.showToast(err.message)
        }else{
            this.showToast(err.body[Object.keys(err.body)[0]])
        }
    }


    showToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }


    closeModal(data?:any) {
        this.viewCtrl.dismiss(data);
    }

}
