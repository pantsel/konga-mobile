import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KongApisPage } from './kong-apis';

@NgModule({
  declarations: [
    KongApisPage,
  ],
  imports: [
    IonicPageModule.forChild(KongApisPage),
  ],
  exports: [
    KongApisPage
  ]
})
export class KongApisPageModule {}
