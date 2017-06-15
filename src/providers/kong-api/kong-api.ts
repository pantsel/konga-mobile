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

  constructor(public http: Http, public api: Api) {
    console.log('Hello KongApiProvider Provider');
  }


  load(params:any) {
    return this.api.get(this.url, params);
  }




  delete(id : string) {
    return  this.api.delete(this.url + '/' + id);
  }

}
