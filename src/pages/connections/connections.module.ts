import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConnectionsPage } from './connections';

@NgModule({
  declarations: [
    ConnectionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnectionsPage),
  ],
  exports: [
    ConnectionsPage
  ]
})
export class ConnectionsPageModule {}
