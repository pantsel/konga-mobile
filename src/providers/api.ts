import {Injectable} from '@angular/core';
import {Http, RequestOptions, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import * as _ from 'lodash';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
    url: string;

    constructor(public http: Http, public storage: Storage) {
    }

    getUrl() {
        return this.storage.get("_kongaConnectionUrl")
            .then(_kongaConnectionUrl => {
                return _kongaConnectionUrl;
            })
    }

    makeRequestOptions() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.storage.forEach((value, key, index) => {


            if (key === '_token') {
                headers.append('Authorization', 'Bearer ' + value);
            }

            if (key === '_kongaConnectionUrl') {
                this.url = value;
            }


        }).then(objects => {

            return new RequestOptions({headers: headers});
        })


    }

    get(endpoint: string, params?: any, options?: RequestOptions) {

        return this.makeRequestOptions()
            .then(defaultOptions => {

                options = _.merge(options,defaultOptions)

                // Support easy query params for GET requests
                if (params) {
                    let p = new URLSearchParams();
                    for (let k in params) {
                        p.set(k, params[k]);
                    }
                    // Set the search field if we have params and don't already have
                    // a search field set in options.
                    options.search = !options.search && p || options.search;
                }


                return new Promise((resolve, reject) => {


                    let seq = this.http.get(this.url + '/' + endpoint,options).share();

                    seq
                        .map(res => res.json())
                        .subscribe(res => {
                            resolve(res)
                        }, err => {
                            reject(err.json())
                        });
                });
            })

    }


    getCustom(endpoint: string, params?: any, options?: RequestOptions) {

        return this.makeRequestOptions()
            .then(defaultOptions => {

                options = _.merge(options,defaultOptions)

                // Support easy query params for GET requests
                if (params) {
                    let p = new URLSearchParams();
                    for (let k in params) {
                        p.set(k, params[k]);
                    }
                    // Set the search field if we have params and don't already have
                    // a search field set in options.
                    options.search = !options.search && p || options.search;
                }


                return new Promise((resolve, reject) => {

                    let seq = this.http.get(endpoint,options).share();

                    seq
                        .map(res => res.json())
                        .subscribe(res => {

                            resolve(res)
                        }, err => {

                            reject(err)
                        });
                });
            })

    }

    post(endpoint: string, body: any, options?: RequestOptions) {


        return this.makeRequestOptions()
            .then(defaultOptions => {

                return new Promise((resolve, reject) => {
                    let seq = this.http.post(this.url + '/' + endpoint, body, defaultOptions).share();

                    seq
                        .map(res => res.json())
                        .subscribe(res => {
                            resolve(res)
                        }, err => {
                            reject(err)
                        });
                });


            })

    }



    put(endpoint: string, body: any, options?: RequestOptions) {

        return this.makeRequestOptions()
            .then(defaultOptions => {
                return new Promise((resolve, reject) => {
                    let seq = this.http.put(this.url + '/' + endpoint, body, defaultOptions).share();

                    seq
                        .map(res => res.json())
                        .subscribe(res => {
                            resolve(res)
                        }, err => {
                            reject(err)
                        });
                });
            })


    }

    delete(endpoint: string, options?: RequestOptions) {


        return this.makeRequestOptions()
            .then(defaultOptions => {

                return new Promise((resolve, reject) => {
                    let seq = this.http.delete(this.url + '/' + endpoint, defaultOptions).share();

                    seq
                        .subscribe(res => {
                            resolve(res)
                        }, err => {
                            reject(err)
                        });
                });


            })

    }

    patch(endpoint: string, body: any, options?: RequestOptions) {

        return this.makeRequestOptions()
            .then(defaultOptions => {
                return new Promise((resolve, reject) => {
                    let seq = this.http.put(this.url + '/' + endpoint, body, defaultOptions).share();

                    seq
                        .map(res => res.json())
                        .subscribe(res => {
                            resolve(res)
                        }, err => {
                            reject(err)
                        });
                });
            })
    }
}
