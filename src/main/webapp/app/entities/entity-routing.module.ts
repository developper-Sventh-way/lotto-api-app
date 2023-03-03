import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'entreprise-chad',
        data: { pageTitle: 'lottoApiApp.entreprise.home.title' },
        loadChildren: () => import('./entreprise-chad/entreprise-chad.module').then(m => m.EntrepriseChadModule),
      },
      {
        path: 'entreprise-plan-chad',
        data: { pageTitle: 'lottoApiApp.entreprisePlan.home.title' },
        loadChildren: () => import('./entreprise-plan-chad/entreprise-plan-chad.module').then(m => m.EntreprisePlanChadModule),
      },
      {
        path: 'entreprise-plan-permission-chad',
        data: { pageTitle: 'lottoApiApp.entreprisePlanPermission.home.title' },
        loadChildren: () =>
          import('./entreprise-plan-permission-chad/entreprise-plan-permission-chad.module').then(
            m => m.EntreprisePlanPermissionChadModule
          ),
      },
      {
        path: 'entreprise-plan-sale-chad',
        data: { pageTitle: 'lottoApiApp.entreprisePlanSale.home.title' },
        loadChildren: () =>
          import('./entreprise-plan-sale-chad/entreprise-plan-sale-chad.module').then(m => m.EntreprisePlanSaleChadModule),
      },
      {
        path: 'state-chad',
        data: { pageTitle: 'lottoApiApp.state.home.title' },
        loadChildren: () => import('./state-chad/state-chad.module').then(m => m.StateChadModule),
      },
      {
        path: 'state-configuration-chad',
        data: { pageTitle: 'lottoApiApp.stateConfiguration.home.title' },
        loadChildren: () => import('./state-configuration-chad/state-configuration-chad.module').then(m => m.StateConfigurationChadModule),
      },
      {
        path: 'day-tirage-chad',
        data: { pageTitle: 'lottoApiApp.dayTirage.home.title' },
        loadChildren: () => import('./day-tirage-chad/day-tirage-chad.module').then(m => m.DayTirageChadModule),
      },
      {
        path: 'request-transaction-chad',
        data: { pageTitle: 'lottoApiApp.requestTransaction.home.title' },
        loadChildren: () => import('./request-transaction-chad/request-transaction-chad.module').then(m => m.RequestTransactionChadModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
