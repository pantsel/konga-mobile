import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the KeysPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'keys',
})
export class KeysPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value, args:string[]) : any {
    let keys = [];
    Object.keys(value).forEach(key =>{
      keys.push({
        key : key,
        value : value[key]
      });
    })
    return keys;
  }
}
