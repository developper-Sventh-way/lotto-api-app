import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntreprisePlanPermissionChad } from '../entreprise-plan-permission-chad.model';

@Component({
  selector: 'jhi-entreprise-plan-permission-chad-detail',
  templateUrl: './entreprise-plan-permission-chad-detail.component.html',
})
export class EntreprisePlanPermissionChadDetailComponent implements OnInit {
  entreprisePlanPermission: IEntreprisePlanPermissionChad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entreprisePlanPermission }) => {
      this.entreprisePlanPermission = entreprisePlanPermission;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
