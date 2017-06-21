import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsumersListPage } from './consumers-list';

@NgModule({
  declarations: [
    ConsumersListPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsumersListPage),
  ],
  exports: [
    ConsumersListPage
  ]
})
export class ConsumersListPageModule {}
