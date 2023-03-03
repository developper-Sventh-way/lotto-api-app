import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EntreprisePlanSaleChadComponent } from '../list/entreprise-plan-sale-chad.component';
import { EntreprisePlanSaleChadDetailComponent } from '../detail/entreprise-plan-sale-chad-detail.component';
import { EntreprisePlanSaleChadUpdateComponent } from '../update/entreprise-plan-sale-chad-update.component';
import { EntreprisePlanSaleChadRoutingResolveService } from './entreprise-plan-sale-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const entreprisePlanSaleRoute: Routes = [
  {
    path: '',
    component: EntreprisePlanSaleChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EntreprisePlanSaleChadDetailComponent,
    resolve: {
      entreprisePlanSale: EntreprisePlanSaleChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EntreprisePlanSaleChadUpdateComponent,
    resolve: {
      entreprisePlanSale: EntreprisePlanSaleChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EntreprisePlanSaleChadUpdateComponent,
    resolve: {
      entreprisePlanSale: EntreprisePlanSaleChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(entreprisePlanSaleRoute)],
  exports: [RouterModule],
})
export class EntreprisePlanSaleChadRoutingModule {}
