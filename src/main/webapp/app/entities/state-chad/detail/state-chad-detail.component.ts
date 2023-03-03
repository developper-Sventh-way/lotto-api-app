import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStateChad } from '../state-chad.model';

@Component({
  selector: 'jhi-state-chad-detail',
  templateUrl: './state-chad-detail.component.html',
})
export class StateChadDetailComponent implements OnInit {
  state: IStateChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ state }) => {
      this.state = state;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
