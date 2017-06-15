import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events, ModalController} from 'ionic-angular';
import {User} from '../../providers/user'
import {ConnectionPage} from '../connection/connection';


/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-main',
    templateUrl: 'main.html',
})
export class MainPage {

    user: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public authUser: User,
                public events: Events,
                public modalCtrl: ModalController) {



    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MainPage');

    }


    ionViewDidEnter() {
        this.initUser();

    }

    ionViewWillLeave() {
        // Unsubscribe from user events
        // this.events.unsubscribe('user:updated')

    }


    initUser() {
        this.authUser.getUser()
            .then(user => {
                this.user = user;
                console.log("MAIN PAGE: initUser =>", this.user)

                if (!this.user.node) {
                    this.presentModal();
                }
            })
    }


    presentModal() {
        let modal = this.modalCtrl.create(ConnectionPage,{
            isModal : true,
            setConnectionAsDefaultAfterCreate : true
        });
        modal.present();
    }

}
