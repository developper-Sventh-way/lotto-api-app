import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StateChadComponent } from '../list/state-chad.component';
import { StateChadDetailComponent } from '../detail/state-chad-detail.component';
import { StateChadUpdateComponent } from '../update/state-chad-update.component';
import { StateChadRoutingResolveService } from './state-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const stateRoute: Routes = [
  {
    path: '',
    component: StateChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StateChadDetailComponent,
    resolve: {
      state: StateChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StateChadUpdateComponent,
    resolve: {
      state: StateChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StateChadUpdateComponent,
    resolve: {
      state: StateChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(stateRoute)],
  exports: [RouterModule],
})
export class StateChadRoutingModule {}
