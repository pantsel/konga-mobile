import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsumerDetailsPage } from './consumer-details';

@NgModule({
  declarations: [
    ConsumerDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsumerDetailsPage),
  ],
  exports: [
    ConsumerDetailsPage
  ]
})
export class ConsumerDetailsPageModule {}
