import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsumerGroupsPage } from './consumer-groups';

@NgModule({
  declarations: [
    ConsumerGroupsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsumerGroupsPage),
  ],
  exports: [
    ConsumerGroupsPage
  ]
})
export class ConsumerGroupsPageModule {}
