import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EntreprisePlanChadComponent } from './list/entreprise-plan-chad.component';
import { EntreprisePlanChadDetailComponent } from './detail/entreprise-plan-chad-detail.component';
import { EntreprisePlanChadUpdateComponent } from './update/entreprise-plan-chad-update.component';
import { EntreprisePlanChadDeleteDialogComponent } from './delete/entreprise-plan-chad-delete-dialog.component';
import { EntreprisePlanChadRoutingModule } from './route/entreprise-plan-chad-routing.module';

@NgModule({
  imports: [SharedModule, EntreprisePlanChadRoutingModule],
  declarations: [
    EntreprisePlanChadComponent,
    EntreprisePlanChadDetailComponent,
    EntreprisePlanChadUpdateComponent,
    EntreprisePlanChadDeleteDialogComponent,
  ],
})
export class EntreprisePlanChadModule {}
