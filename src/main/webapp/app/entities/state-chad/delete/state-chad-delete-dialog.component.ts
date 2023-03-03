import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStateChad } from '../state-chad.model';
import { StateChadService } from '../service/state-chad.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './state-chad-delete-dialog.component.html',
})
export class StateChadDeleteDialogComponent {
  state?: IStateChad;

  constructor(protected stateService: StateChadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.stateService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
