import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EntreprisePlanPermissionChadComponent } from './list/entreprise-plan-permission-chad.component';
import { EntreprisePlanPermissionChadDetailComponent } from './detail/entreprise-plan-permission-chad-detail.component';
import { EntreprisePlanPermissionChadUpdateComponent } from './update/entreprise-plan-permission-chad-update.component';
import { EntreprisePlanPermissionChadDeleteDialogComponent } from './delete/entreprise-plan-permission-chad-delete-dialog.component';
import { EntreprisePlanPermissionChadRoutingModule } from './route/entreprise-plan-permission-chad-routing.module';

@NgModule({
  imports: [SharedModule, EntreprisePlanPermissionChadRoutingModule],
  declarations: [
    EntreprisePlanPermissionChadComponent,
    EntreprisePlanPermissionChadDetailComponent,
    EntreprisePlanPermissionChadUpdateComponent,
    EntreprisePlanPermissionChadDeleteDialogComponent,
  ],
})
export class EntreprisePlanPermissionChadModule {}
