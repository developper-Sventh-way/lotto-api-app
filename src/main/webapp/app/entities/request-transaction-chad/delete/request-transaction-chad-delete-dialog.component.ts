import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRequestTransactionChad } from '../request-transaction-chad.model';
import { RequestTransactionChadService } from '../service/request-transaction-chad.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './request-transaction-chad-delete-dialog.component.html',
})
export class RequestTransactionChadDeleteDialogComponent {
  requestTransaction?: IRequestTransactionChad;

  constructor(protected requestTransactionService: RequestTransactionChadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.requestTransactionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
