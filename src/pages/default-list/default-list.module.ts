import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefaultListPage } from './default-list';

@NgModule({
  declarations: [
    DefaultListPage,
  ],
  imports: [
    IonicPageModule.forChild(DefaultListPage),
  ],
  exports: [
    DefaultListPage
  ]
})
export class DefaultListPageModule {}
