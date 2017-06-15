import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Api } from './api';
import { User } from './user';
import { Events } from 'ionic-angular';
import { SailsService } from "angular2-sails"
import {Storage} from '@ionic/storage';

/*
 Generated class for the SocketProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SocketProvider {
    token:string;
    authUser:any;
    isConnected : boolean = false;
    connectInterval : any = null;
    connection : any = null;

    constructor(public api:Api, public user:User, public events:Events,
                private storage : Storage,
                public _sailsService:SailsService) {

    }

    initialize() {


        this.api.getUrl()
            .then(url => {

                if (!url) return false;

                this.user.getToken()
                    .then(token => {
                        if (!token) return false;

                        this.token = token;

                        this.user.getUser()
                            .then(user => {
                                this.authUser = user;
                                this.connect(url)
                            })
                    })
            })
    }

    connect(url) {

        this._sailsService.connect(url).subscribe(connection =>{

            this.onConnection(connection)

        })


        this._sailsService.on('disconnect')
            .subscribe(message => {
                this.connection.connected = false;
                if(!this.connectInterval) this.startRetries(url);

            })

    }

    onConnection(connection) {
        this.connection = connection
        if(connection.connected) {
            clearInterval(this.connectInterval);
            this.makeSubscriptions();
        }else{
            this.startRetries(connection.url)
        }
    }

    startRetries(url) {
        this.connectInterval = setInterval(() => {
            if(this.connection && this.connection.connected) {
                clearInterval(this.connectInterval);
                this.connectInterval = null;
                return false;
            }

            this._sailsService.connect(url).subscribe(connection =>{

                this.onConnection(connection)
            })
        }, 5000);

    }


    makeSubscriptions() {

        // Subscribe to user updates

        this._sailsService.get('/api/user/' + this.authUser.id + '/subscribe?token=' + this.token)
            .subscribe(res =>{

                let data = res.data;
                let jwr = res.response;

                if (jwr.statusCode == 200) {
                    console.log("Subscribed to room", data.room)

                    this._sailsService.on(data.room)
                        .subscribe(obj => {
                            this.storage.set("_user",obj)
                            this.events.publish("user:updated",obj)
                        });
                } else {
                    console.log(jwr);
                }
            })

        // Subscribe to Node/Connection health checks

        this._sailsService.get('/api/kongnodes/healthchecks/subscribe?token=' + this.token)
            .subscribe(res =>{

                let data = res.data;
                let jwr = res.response;

                if (jwr.statusCode == 200) {
                    console.log("Subscribed to room", data.room)

                    this._sailsService.on(data.room)
                        .subscribe(obj => {
                            this.events.publish("node:health_checks",obj)
                        });
                } else {
                    console.log(jwr);
                }
            })

        // Subscribe to API health checks

        this._sailsService.get('/api/apis/healthchecks/subscribe?token=' + this.token)
            .subscribe(res =>{

                let data = res.data;
                let jwr = res.response;

                if (jwr.statusCode == 200) {
                    console.log("Subscribed to room", data.room)

                    this._sailsService.on(data.room)
                        .subscribe(obj => {
                            this.events.publish("api:health_checks",obj)
                        });
                } else {
                    console.log(jwr);
                }
            })
    }

}
