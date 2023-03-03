import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { StateChadComponent } from './list/state-chad.component';
import { StateChadDetailComponent } from './detail/state-chad-detail.component';
import { StateChadUpdateComponent } from './update/state-chad-update.component';
import { StateChadDeleteDialogComponent } from './delete/state-chad-delete-dialog.component';
import { StateChadRoutingModule } from './route/state-chad-routing.module';

@NgModule({
  imports: [SharedModule, StateChadRoutingModule],
  declarations: [StateChadComponent, StateChadDetailComponent, StateChadUpdateComponent, StateChadDeleteDialogComponent],
})
export class StateChadModule {}
