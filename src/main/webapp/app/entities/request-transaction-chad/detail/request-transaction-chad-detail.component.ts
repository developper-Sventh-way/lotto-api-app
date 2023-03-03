import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRequestTransactionChad } from '../request-transaction-chad.model';

@Component({
  selector: 'jhi-request-transaction-chad-detail',
  templateUrl: './request-transaction-chad-detail.component.html',
})
export class RequestTransactionChadDetailComponent implements OnInit {
  requestTransaction: IRequestTransactionChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ requestTransaction }) => {
      this.requestTransaction = requestTransaction;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
