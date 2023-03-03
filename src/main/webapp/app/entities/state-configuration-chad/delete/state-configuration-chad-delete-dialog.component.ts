import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStateConfigurationChad } from '../state-configuration-chad.model';
import { StateConfigurationChadService } from '../service/state-configuration-chad.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './state-configuration-chad-delete-dialog.component.html',
})
export class StateConfigurationChadDeleteDialogComponent {
  stateConfiguration?: IStateConfigurationChad;

  constructor(protected stateConfigurationService: StateConfigurationChadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.stateConfigurationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
