import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from '../api';
import 'rxjs/add/operator/map';

/*
  Generated class for the KongApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class KongApiProvider {

  url : string = 'kong/apis';
  name : string = 'APIs';

  constructor(public http: Http, public api: Api) {
    console.log('Hello KongApiProvider Provider');
  }


  load(params:any) {
    return this.api.get(this.url, params);
  }


  listPlugins(id : string) {
    return  this.api.get(this.url + '/' + id + '/plugins');
  }

  addPlugin(id:string,data:any) {
    return  this.api.post(this.url + '/' + id + '/plugins',data);
  }

  updatePlugin(id:string,data:any) {
    return  this.api.patch(this.url + '/' + id + '/plugins/' + data.id,data);
  }


  removePlugin(apiId,pluginId) {
    return  this.api.delete(this.url + '/' + apiId + '/plugins/' + pluginId);
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
