import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class Connection {
  _connection : any;

  constructor(public http: Http, public api: Api, public storage: Storage,) {



  }

  makeRequestOptions(){


    return this.storage.get('_token')
        .then(token => {
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', 'Bearer ' + token);

          return new RequestOptions({ headers: headers });
        })


  }


  create(data:any) {
      return this.api.post('api/kongnode', data);
  }


  load(params:any) {
    return this.api.get('api/kongnode', params);
  }

  update(id,data) {

    return this.api.put('api/kongnode/' + id,data);

  }


  delete(id : string) {
    return  this.api.delete('api/kongnode/' + id);
  }


}
