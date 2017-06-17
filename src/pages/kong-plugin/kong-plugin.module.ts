import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KongPluginPage } from './kong-plugin';

@NgModule({
  declarations: [
    KongPluginPage,
  ],
  imports: [
    IonicPageModule.forChild(KongPluginPage),
  ],
  exports: [
    KongPluginPage
  ]
})
export class KongPluginPageModule {}
