import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KongApiPluginsPage } from './kong-api-plugins';

@NgModule({
  declarations: [
    KongApiPluginsPage,
  ],
  imports: [
    IonicPageModule.forChild(KongApiPluginsPage),
  ],
  exports: [
    KongApiPluginsPage
  ]
})
export class KongApiPluginsPageModule {}
