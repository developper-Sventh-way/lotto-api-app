import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntreprisePlanSaleChad } from '../entreprise-plan-sale-chad.model';

@Component({
  selector: 'jhi-entreprise-plan-sale-chad-detail',
  templateUrl: './entreprise-plan-sale-chad-detail.component.html',
})
export class EntreprisePlanSaleChadDetailComponent implements OnInit {
  entreprisePlanSale: IEntreprisePlanSaleChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entreprisePlanSale }) => {
      this.entreprisePlanSale = entreprisePlanSale;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
