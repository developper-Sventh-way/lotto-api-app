import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDayTirageChad } from '../day-tirage-chad.model';
import { DayTirageChadService } from '../service/day-tirage-chad.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './day-tirage-chad-delete-dialog.component.html',
})
export class DayTirageChadDeleteDialogComponent {
  dayTirage?: IDayTirageChad;

  constructor(protected dayTirageService: DayTirageChadService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.dayTirageService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
