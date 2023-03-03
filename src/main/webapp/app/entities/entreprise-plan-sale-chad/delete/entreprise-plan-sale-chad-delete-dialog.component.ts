import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntreprisePlanSaleChad } from '../entreprise-plan-sale-chad.model';
import { EntreprisePlanSaleChadService } from '../service/entreprise-plan-sale-chad.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './entreprise-plan-sale-chad-delete-dialog.component.html',
})
export class EntreprisePlanSaleChadDeleteDialogComponent {
  entreprisePlanSale?: IEntreprisePlanSaleChad;

  constructor(protected entreprisePlanSaleService: EntreprisePlanSaleChadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.entreprisePlanSaleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
