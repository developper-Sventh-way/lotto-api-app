import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RequestTransactionChadComponent } from '../list/request-transaction-chad.component';
import { RequestTransactionChadDetailComponent } from '../detail/request-transaction-chad-detail.component';
import { RequestTransactionChadUpdateComponent } from '../update/request-transaction-chad-update.component';
import { RequestTransactionChadRoutingResolveService } from './request-transaction-chad-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const requestTransactionRoute: Routes = [
  {
    path: '',
    component: RequestTransactionChadComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RequestTransactionChadDetailComponent,
    resolve: {
      requestTransaction: RequestTransactionChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RequestTransactionChadUpdateComponent,
    resolve: {
      requestTransaction: RequestTransactionChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RequestTransactionChadUpdateComponent,
    resolve: {
      requestTransaction: RequestTransactionChadRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(requestTransactionRoute)],
  exports: [RouterModule],
})
export class RequestTransactionChadRoutingModule {}
