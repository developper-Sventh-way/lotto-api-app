import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEntreprisePlanPermissionChad } from '../entreprise-plan-permission-chad.model';
import { EntreprisePlanPermissionChadService } from '../service/entreprise-plan-permission-chad.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './entreprise-plan-permission-chad-delete-dialog.component.html',
})
export class EntreprisePlanPermissionChadDeleteDialogComponent {
  entreprisePlanPermission?: IEntreprisePlanPermissionChad;

  constructor(protected entreprisePlanPermissionService: EntreprisePlanPermissionChadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.entreprisePlanPermissionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
