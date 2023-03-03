import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EntreprisePlanChadComponent } from '../list/entreprise-plan-chad.component';
import { EntreprisePlanChadDetailComponent } from '../detail/entreprise-plan-chad-detail.component';
import { EntreprisePlanChadUpdateComponent } from '../update/entreprise-plan-chad-update.component';
import { EntreprisePlanChadRoutingResolveService } from './entreprise-plan-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const entreprisePlanRoute: Routes = [
  {
    path: '',
    component: EntreprisePlanChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntreprisePlanChadDetailComponent,
    resolve: {
      entreprisePlan: EntreprisePlanChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntreprisePlanChadUpdateComponent,
    resolve: {
      entreprisePlan: EntreprisePlanChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntreprisePlanChadUpdateComponent,
    resolve: {
      entreprisePlan: EntreprisePlanChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(entreprisePlanRoute)],
  exports: [RouterModule],
})
export class EntreprisePlanChadRoutingModule {}
