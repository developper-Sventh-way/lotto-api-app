import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntreprisePlanChad } from '../entreprise-plan-chad.model';
import { EntreprisePlanChadService } from '../service/entreprise-plan-chad.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './entreprise-plan-chad-delete-dialog.component.html',
})
export class EntreprisePlanChadDeleteDialogComponent {
  entreprisePlan?: IEntreprisePlanChad;

  constructor(protected entreprisePlanService: EntreprisePlanChadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.entreprisePlanService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
