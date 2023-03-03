import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DayTirageChadComponent } from './list/day-tirage-chad.component';
import { DayTirageChadDetailComponent } from './detail/day-tirage-chad-detail.component';
import { DayTirageChadUpdateComponent } from './update/day-tirage-chad-update.component';
import { DayTirageChadDeleteDialogComponent } from './delete/day-tirage-chad-delete-dialog.component';
import { DayTirageChadRoutingModule } from './route/day-tirage-chad-routing.module';

@NgModule({
  imports: [SharedModule, DayTirageChadRoutingModule],
  declarations: [DayTirageChadComponent, DayTirageChadDetailComponent, DayTirageChadUpdateComponent, DayTirageChadDeleteDialogComponent],
})
export class DayTirageChadModule {}
