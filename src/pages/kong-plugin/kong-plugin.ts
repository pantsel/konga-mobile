import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, AlertController, Events, ToastController} from 'ionic-angular';
import {KongApiProvider} from '../../providers/kong-api/kong-api';
import {KongPluginsProvider} from '../../providers/kong-plugins/kong-plugins';
import {KeysPipe} from '../../pipes/keys/keys';
import * as _ from 'lodash';

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
    _ : any = _;

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

        this.initData();



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

                if(!this.data.api_id) this.initDataConfig(this.schema);

            }, err => {
                console.log("FAILED TO RETRIEVE PLUGIN SCHEMA => ", err);
            })
    }


    initData() {

        var existingPluginData = this.getPluginFromApi();



        this.data = existingPluginData || {
            name : this.pluginName,
            config : {}
        }

        console.log("INIT DATA => ", this.data)
    }

    getPluginFromApi() {
        if(!this.api.plugins) return null;
        for(let i=0; i<this.api.plugins.length; i++) {
            let plugin = this.api.plugins[i];
            if(plugin.name === this.pluginName) {
                return plugin;
            }
        }

        return null;
    }


    initDataConfig(schema,path?:any) {


        if(this.data.api_id) return;


        Object.keys(schema.fields).forEach(key => {

            if(schema.fields[key].schema) {
                let _path = key;
                this.initDataConfig(schema.fields[key].schema,_path)
            }else{
                if(schema.fields[key] && schema.fields[key] !== "function" && schema.fields[key].default !== "function") {
                    // this.data.config[key] = null;
                    _.set(this.data,'config.' + ( path || key ),schema.fields[key].default)
                }
            }


        })
    }


    save() {
        console.log("SAVE CLICKED : Fields =>",this.schema.fields)


        let data = this.data;


        console.log("SAVE CLICKED : DATA =>",data)

        if(this.api) {

            this.data.api_id ? this.updatePlugin(data) : this.addPlugin(data)

        }
    }

    addPlugin(data) {
        this.kongApiProvider.addPlugin(this.api.id,data)
            .then((res:any)=>{

                this.showToast("Plugin added successfully!");
                this.closeModal({ 'update': true });

            }, err => {
                console.error("FAILED TO ADD PLUGIN",err.json())
                this.handleError(err.json())
            })
    }

    updatePlugin(data) {
        this.kongApiProvider.updatePlugin(this.api.id,data)
            .then((res:any)=>{

                this.showToast("Plugin updated successfully!");
                this.closeModal({ 'update': true });

            }, err => {
                console.error("FAILED TO UPDATE PLUGIN",err.json())
                this.handleError(err.json())
            })
    }

    setConfigValue(newValue,path) {
        _.set(this.data,path,newValue)
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
