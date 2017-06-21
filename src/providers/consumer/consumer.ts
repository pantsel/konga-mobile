import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from '../api';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConsumerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConsumerProvider {

  url : string = 'kong/consumers';
  name : string = 'Consumer';
  searchFields : any = ['username','custom_id'];
  listFields  : any = ['username','custom_id'];

  constructor(public http: Http, public api: Api) {
    console.log('Hello ConsumerProvider Provider');
  }

  load(params:any) {
    return this.api.get(this.url, params);
  }


  groups(id : string) {
    return this.api.get(this.url + "/" + id + "/acls");
  }

  addGroup(consumerId:string, groupName) {
    return this.api.post(this.url + "/" + consumerId + "/acls",{
      group : groupName
    });
  }

  deleteGroup(consumerId:string, groupId:string) {
    return  this.api.delete(this.url + "/" + consumerId + "/acls/" + groupId);
  }


  delete(id : string) {
    return  this.api.delete(this.url + '/' + id);
  }


  update(id,data) {

    return this.api.put(this.url + '/' + id,data);

  }

  create(data) {

    return this.api.post(this.url,data);

  }

}
