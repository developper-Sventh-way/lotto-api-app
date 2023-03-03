import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntreprisePlanChad } from '../entreprise-plan-chad.model';

@Component({
  selector: 'jhi-entreprise-plan-chad-detail',
  templateUrl: './entreprise-plan-chad-detail.component.html',
})
export class EntreprisePlanChadDetailComponent implements OnInit {
  entreprisePlan: IEntreprisePlanChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entreprisePlan }) => {
      this.entreprisePlan = entreprisePlan;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
