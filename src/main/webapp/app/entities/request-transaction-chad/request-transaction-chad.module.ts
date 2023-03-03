import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RequestTransactionChadComponent } from './list/request-transaction-chad.component';
import { RequestTransactionChadDetailComponent } from './detail/request-transaction-chad-detail.component';
import { RequestTransactionChadUpdateComponent } from './update/request-transaction-chad-update.component';
import { RequestTransactionChadDeleteDialogComponent } from './delete/request-transaction-chad-delete-dialog.component';
import { RequestTransactionChadRoutingModule } from './route/request-transaction-chad-routing.module';

@NgModule({
  imports: [SharedModule, RequestTransactionChadRoutingModule],
  declarations: [
    RequestTransactionChadComponent,
    RequestTransactionChadDetailComponent,
    RequestTransactionChadUpdateComponent,
    RequestTransactionChadDeleteDialogComponent,
  ],
})
export class RequestTransactionChadModule {}
