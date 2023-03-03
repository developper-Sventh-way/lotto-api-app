import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DayTirageChadComponent } from '../list/day-tirage-chad.component';
import { DayTirageChadDetailComponent } from '../detail/day-tirage-chad-detail.component';
import { DayTirageChadUpdateComponent } from '../update/day-tirage-chad-update.component';
import { DayTirageChadRoutingResolveService } from './day-tirage-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const dayTirageRoute: Routes = [
  {
    path: '',
    component: DayTirageChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DayTirageChadDetailComponent,
    resolve: {
      dayTirage: DayTirageChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DayTirageChadUpdateComponent,
    resolve: {
      dayTirage: DayTirageChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DayTirageChadUpdateComponent,
    resolve: {
      dayTirage: DayTirageChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dayTirageRoute)],
  exports: [RouterModule],
})
export class DayTirageChadRoutingModule {}
