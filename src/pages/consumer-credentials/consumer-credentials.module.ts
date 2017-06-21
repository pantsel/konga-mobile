import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsumerCredentialsPage } from './consumer-credentials';

@NgModule({
  declarations: [
    ConsumerCredentialsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsumerCredentialsPage),
  ],
  exports: [
    ConsumerCredentialsPage
  ]
})
export class ConsumerCredentialsPageModule {}
