import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NodeHealthChecksPage } from './node-health-checks';

@NgModule({
  declarations: [
    NodeHealthChecksPage,
  ],
  imports: [
    IonicPageModule.forChild(NodeHealthChecksPage),
  ],
  exports: [
    NodeHealthChecksPage
  ]
})
export class NodeHealthChecksPageModule {}
