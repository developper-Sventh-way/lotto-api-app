import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { StateConfigurationChadComponent } from '../list/state-configuration-chad.component';
import { StateConfigurationChadDetailComponent } from '../detail/state-configuration-chad-detail.component';
import { StateConfigurationChadUpdateComponent } from '../update/state-configuration-chad-update.component';
import { StateConfigurationChadRoutingResolveService } from './state-configuration-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const stateConfigurationRoute: Routes = [
  {
    path: '',
    component: StateConfigurationChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StateConfigurationChadDetailComponent,
    resolve: {
      stateConfiguration: StateConfigurationChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StateConfigurationChadUpdateComponent,
    resolve: {
      stateConfiguration: StateConfigurationChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StateConfigurationChadUpdateComponent,
    resolve: {
      stateConfiguration: StateConfigurationChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(stateConfigurationRoute)],
  exports: [RouterModule],
})
export class StateConfigurationChadRoutingModule {}
