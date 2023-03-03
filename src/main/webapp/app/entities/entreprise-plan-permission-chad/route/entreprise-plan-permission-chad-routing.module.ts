import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EntreprisePlanPermissionChadComponent } from '../list/entreprise-plan-permission-chad.component';
import { EntreprisePlanPermissionChadDetailComponent } from '../detail/entreprise-plan-permission-chad-detail.component';
import { EntreprisePlanPermissionChadUpdateComponent } from '../update/entreprise-plan-permission-chad-update.component';
import { EntreprisePlanPermissionChadRoutingResolveService } from './entreprise-plan-permission-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const entreprisePlanPermissionRoute: Routes = [
  {
    path: '',
    component: EntreprisePlanPermissionChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntreprisePlanPermissionChadDetailComponent,
    resolve: {
      entreprisePlanPermission: EntreprisePlanPermissionChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntreprisePlanPermissionChadUpdateComponent,
    resolve: {
      entreprisePlanPermission: EntreprisePlanPermissionChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntreprisePlanPermissionChadUpdateComponent,
    resolve: {
      entreprisePlanPermission: EntreprisePlanPermissionChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(entreprisePlanPermissionRoute)],
  exports: [RouterModule],
})
export class EntreprisePlanPermissionChadRoutingModule {}
