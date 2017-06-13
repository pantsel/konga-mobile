import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConnectionEditPage } from './connection-edit';

@NgModule({
  declarations: [
    ConnectionEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnectionEditPage),
  ],
  exports: [
    ConnectionEditPage
  ]
})
export class ConnectionEditPageModule {}
