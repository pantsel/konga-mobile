import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import * as sails from '../../node_modules/sails.io.js/dist/sails.io.js';
import { Api } from './api';
import { User } from './user';
import { Events } from 'ionic-angular';
import { SailsService } from "angular2-sails"

/*
 Generated class for the SocketProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SocketProvider {

    socketObserver:any;
    socketService:any;
    socket:any;
    token:string;
    authUser:any;

    constructor(public api:Api, public user:User, public events:Events, public _sailsService:SailsService) {
        console.log('Hello SocketProvider');

        this.socketService = Observable.create(observer => {
            this.socketObserver = observer;
        });

        this.events.subscribe("user:login", () => {
            this.initialize();
        })
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

                                console.log("Socket : connection url => ", url)
                                this.connect(url)
                            })
                    })
            })
    }

    connect(url) {

        var _this = this;
        this._sailsService.connect(url);

        this._sailsService.get('/api/user/' + this.authUser.id + '/subscribe?token=' + this.token,
            function (data, jwr) {

                if (jwr.statusCode == 200) {
                    console.log("Subscribed to room", data.room)

                    _this._sailsService.on(data.room)
                        .subscribe(obj => {
                            _this.events.publish("user:updated",obj)
                        });
                } else {
                    console.log(jwr);
                }
            });

    }

}
