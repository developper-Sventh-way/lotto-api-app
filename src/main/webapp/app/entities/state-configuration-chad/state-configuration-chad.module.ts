import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StateConfigurationChadComponent } from './list/state-configuration-chad.component';
import { StateConfigurationChadDetailComponent } from './detail/state-configuration-chad-detail.component';
import { StateConfigurationChadUpdateComponent } from './update/state-configuration-chad-update.component';
import { StateConfigurationChadDeleteDialogComponent } from './delete/state-configuration-chad-delete-dialog.component';
import { StateConfigurationChadRoutingModule } from './route/state-configuration-chad-routing.module';

@NgModule({
  imports: [SharedModule, StateConfigurationChadRoutingModule],
  declarations: [
    StateConfigurationChadComponent,
    StateConfigurationChadDetailComponent,
    StateConfigurationChadUpdateComponent,
    StateConfigurationChadDeleteDialogComponent,
  ],
})
export class StateConfigurationChadModule {}
