import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EntreprisePlanChadFormService, EntreprisePlanChadFormGroup } from './entreprise-plan-chad-form.service';
import { IEntreprisePlanChad } from '../entreprise-plan-chad.model';
import { EntreprisePlanChadService } from '../service/entreprise-plan-chad.service';
import { TypePlan } from 'app/entities/enumerations/type-plan.model';

@Component({
  selector: 'jhi-entreprise-plan-chad-update',
  templateUrl: './entreprise-plan-chad-update.component.html',
})
export class EntreprisePlanChadUpdateComponent implements OnInit {
  isSaving = false;
  entreprisePlan: IEntreprisePlanChad | null = null;
  typePlanValues = Object.keys(TypePlan);

  editForm: EntreprisePlanChadFormGroup = this.entreprisePlanFormService.createEntreprisePlanChadFormGroup();

  constructor(
    protected entreprisePlanService: EntreprisePlanChadService,
    protected entreprisePlanFormService: EntreprisePlanChadFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entreprisePlan }) => {
      this.entreprisePlan = entreprisePlan;
      if (entreprisePlan) {
        this.updateForm(entreprisePlan);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entreprisePlan = this.entreprisePlanFormService.getEntreprisePlanChad(this.editForm);
    if (entreprisePlan.id !== null) {
      this.subscribeToSaveResponse(this.entreprisePlanService.update(entreprisePlan));
    } else {
      this.subscribeToSaveResponse(this.entreprisePlanService.create(entreprisePlan));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntreprisePlanChad>>): void {
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

  protected updateForm(entreprisePlan: IEntreprisePlanChad): void {
    this.entreprisePlan = entreprisePlan;
    this.entreprisePlanFormService.resetForm(this.editForm, entreprisePlan);
  }
}
