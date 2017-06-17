import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KongApiEditPage } from './kong-api-edit';

@NgModule({
  declarations: [
    KongApiEditPage,
  ],
  imports: [
    IonicPageModule.forChild(KongApiEditPage),
  ],
  exports: [
    KongApiEditPage
  ]
})
export class KongApiEditPageModule {}
