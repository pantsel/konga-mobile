import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KongApiPage } from './kong-api';

@NgModule({
  declarations: [
    KongApiPage,
  ],
  imports: [
    IonicPageModule.forChild(KongApiPage),
  ],
  exports: [
    KongApiPage
  ]
})
export class KongApiPageModule {}
