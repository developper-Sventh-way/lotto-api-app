import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import {
  EntreprisePlanPermissionChadFormService,
  EntreprisePlanPermissionChadFormGroup,
} from './entreprise-plan-permission-chad-form.service';
import { IEntreprisePlanPermissionChad } from '../entreprise-plan-permission-chad.model';
import { EntreprisePlanPermissionChadService } from '../service/entreprise-plan-permission-chad.service';
import { IEntreprisePlanChad } from 'app/entities/entreprise-plan-chad/entreprise-plan-chad.model';
import { EntreprisePlanChadService } from 'app/entities/entreprise-plan-chad/service/entreprise-plan-chad.service';
import { IStateChad } from 'app/entities/state-chad/state-chad.model';
import { StateChadService } from 'app/entities/state-chad/service/state-chad.service';

@Component({
  selector: 'jhi-entreprise-plan-permission-chad-update',
  templateUrl: './entreprise-plan-permission-chad-update.component.html',
})
export class EntreprisePlanPermissionChadUpdateComponent implements OnInit {
  isSaving = false;
  entreprisePlanPermission: IEntreprisePlanPermissionChad | null = null;

  entreprisePlansSharedCollection: IEntreprisePlanChad[] = [];
  statesSharedCollection: IStateChad[] = [];

  editForm: EntreprisePlanPermissionChadFormGroup = this.entreprisePlanPermissionFormService.createEntreprisePlanPermissionChadFormGroup();

  constructor(
    protected entreprisePlanPermissionService: EntreprisePlanPermissionChadService,
    protected entreprisePlanPermissionFormService: EntreprisePlanPermissionChadFormService,
    protected entreprisePlanService: EntreprisePlanChadService,
    protected stateService: StateChadService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEntreprisePlanChad = (o1: IEntreprisePlanChad | null, o2: IEntreprisePlanChad | null): boolean =>
    this.entreprisePlanService.compareEntreprisePlanChad(o1, o2);

  compareStateChad = (o1: IStateChad | null, o2: IStateChad | null): boolean => this.stateService.compareStateChad(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entreprisePlanPermission }) => {
      this.entreprisePlanPermission = entreprisePlanPermission;
      if (entreprisePlanPermission) {
        this.updateForm(entreprisePlanPermission);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entreprisePlanPermission = this.entreprisePlanPermissionFormService.getEntreprisePlanPermissionChad(this.editForm);
    if (entreprisePlanPermission.id !== null) {
      this.subscribeToSaveResponse(this.entreprisePlanPermissionService.update(entreprisePlanPermission));
    } else {
      this.subscribeToSaveResponse(this.entreprisePlanPermissionService.create(entreprisePlanPermission));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntreprisePlanPermissionChad>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(entreprisePlanPermission: IEntreprisePlanPermissionChad): void {
    this.entreprisePlanPermission = entreprisePlanPermission;
    this.entreprisePlanPermissionFormService.resetForm(this.editForm, entreprisePlanPermission);

    this.entreprisePlansSharedCollection = this.entreprisePlanService.addEntreprisePlanChadToCollectionIfMissing<IEntreprisePlanChad>(
      this.entreprisePlansSharedCollection,
      entreprisePlanPermission.entreprisePlan
    );
    this.statesSharedCollection = this.stateService.addStateChadToCollectionIfMissing<IStateChad>(
      this.statesSharedCollection,
      entreprisePlanPermission.state
    );
  }

  protected loadRelationshipsOptions(): void {
    this.entreprisePlanService
      .query()
      .pipe(map((res: HttpResponse<IEntreprisePlanChad[]>) => res.body ?? []))
      .pipe(
        map((entreprisePlans: IEntreprisePlanChad[]) =>
          this.entreprisePlanService.addEntreprisePlanChadToCollectionIfMissing<IEntreprisePlanChad>(
            entreprisePlans,
            this.entreprisePlanPermission?.entreprisePlan
          )
        )
      )
      .subscribe((entreprisePlans: IEntreprisePlanChad[]) => (this.entreprisePlansSharedCollection = entreprisePlans));

    this.stateService
      .query()
      .pipe(map((res: HttpResponse<IStateChad[]>) => res.body ?? []))
      .pipe(
        map((states: IStateChad[]) =>
          this.stateService.addStateChadToCollectionIfMissing<IStateChad>(states, this.entreprisePlanPermission?.state)
        )
      )
      .subscribe((states: IStateChad[]) => (this.statesSharedCollection = states));
  }
}
