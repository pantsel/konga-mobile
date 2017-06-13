import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConnectionDetailsPage } from './connection-details';

@NgModule({
  declarations: [
    ConnectionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnectionDetailsPage),
  ],
  exports: [
    ConnectionDetailsPage
  ]
})
export class ConnectionDetailsPageModule {}
