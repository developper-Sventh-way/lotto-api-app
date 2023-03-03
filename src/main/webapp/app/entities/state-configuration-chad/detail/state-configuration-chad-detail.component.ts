import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStateConfigurationChad } from '../state-configuration-chad.model';

@Component({
  selector: 'jhi-state-configuration-chad-detail',
  templateUrl: './state-configuration-chad-detail.component.html',
})
export class StateConfigurationChadDetailComponent implements OnInit {
  stateConfiguration: IStateConfigurationChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stateConfiguration }) => {
      this.stateConfiguration = stateConfiguration;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
