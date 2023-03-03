import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EntreprisePlanSaleChadComponent } from './list/entreprise-plan-sale-chad.component';
import { EntreprisePlanSaleChadDetailComponent } from './detail/entreprise-plan-sale-chad-detail.component';
import { EntreprisePlanSaleChadUpdateComponent } from './update/entreprise-plan-sale-chad-update.component';
import { EntreprisePlanSaleChadDeleteDialogComponent } from './delete/entreprise-plan-sale-chad-delete-dialog.component';
import { EntreprisePlanSaleChadRoutingModule } from './route/entreprise-plan-sale-chad-routing.module';

@NgModule({
  imports: [SharedModule, EntreprisePlanSaleChadRoutingModule],
  declarations: [
    EntreprisePlanSaleChadComponent,
    EntreprisePlanSaleChadDetailComponent,
    EntreprisePlanSaleChadUpdateComponent,
    EntreprisePlanSaleChadDeleteDialogComponent,
  ],
})
export class EntreprisePlanSaleChadModule {}
