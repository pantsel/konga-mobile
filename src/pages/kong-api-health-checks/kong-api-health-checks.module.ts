import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KongApiHealthChecksPage } from './kong-api-health-checks';

@NgModule({
  declarations: [
    KongApiHealthChecksPage,
  ],
  imports: [
    IonicPageModule.forChild(KongApiHealthChecksPage),
  ],
  exports: [
    KongApiHealthChecksPage
  ]
})
export class KongApiHealthChecksPageModule {}
