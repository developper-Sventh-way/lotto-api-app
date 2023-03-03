import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { EntreprisePlanSaleChadFormService, EntreprisePlanSaleChadFormGroup } from './entreprise-plan-sale-chad-form.service';
import { IEntreprisePlanSaleChad } from '../entreprise-plan-sale-chad.model';
import { EntreprisePlanSaleChadService } from '../service/entreprise-plan-sale-chad.service';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { EntrepriseChadService } from 'app/entities/entreprise-chad/service/entreprise-chad.service';
import { IEntreprisePlanChad } from 'app/entities/entreprise-plan-chad/entreprise-plan-chad.model';
import { EntreprisePlanChadService } from 'app/entities/entreprise-plan-chad/service/entreprise-plan-chad.service';
import { PlanStatut } from 'app/entities/enumerations/plan-statut.model';

@Component({
  selector: 'jhi-entreprise-plan-sale-chad-update',
  templateUrl: './entreprise-plan-sale-chad-update.component.html',
})
export class EntreprisePlanSaleChadUpdateComponent implements OnInit {
  isSaving = false;
  entreprisePlanSale: IEntreprisePlanSaleChad | null = null;
  planStatutValues = Object.keys(PlanStatut);

  entreprisesSharedCollection: IEntrepriseChad[] = [];
  entreprisePlansSharedCollection: IEntreprisePlanChad[] = [];

  editForm: EntreprisePlanSaleChadFormGroup = this.entreprisePlanSaleFormService.createEntreprisePlanSaleChadFormGroup();

  constructor(
    protected entreprisePlanSaleService: EntreprisePlanSaleChadService,
    protected entreprisePlanSaleFormService: EntreprisePlanSaleChadFormService,
    protected entrepriseService: EntrepriseChadService,
    protected entreprisePlanService: EntreprisePlanChadService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEntrepriseChad = (o1: IEntrepriseChad | null, o2: IEntrepriseChad | null): boolean =>
    this.entrepriseService.compareEntrepriseChad(o1, o2);

  compareEntreprisePlanChad = (o1: IEntreprisePlanChad | null, o2: IEntreprisePlanChad | null): boolean =>
    this.entreprisePlanService.compareEntreprisePlanChad(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ entreprisePlanSale }) => {
      this.entreprisePlanSale = entreprisePlanSale;
      if (entreprisePlanSale) {
        this.updateForm(entreprisePlanSale);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const entreprisePlanSale = this.entreprisePlanSaleFormService.getEntreprisePlanSaleChad(this.editForm);
    if (entreprisePlanSale.id !== null) {
      this.subscribeToSaveResponse(this.entreprisePlanSaleService.update(entreprisePlanSale));
    } else {
      this.subscribeToSaveResponse(this.entreprisePlanSaleService.create(entreprisePlanSale));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntreprisePlanSaleChad>>): void {
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

  protected updateForm(entreprisePlanSale: IEntreprisePlanSaleChad): void {
    this.entreprisePlanSale = entreprisePlanSale;
    this.entreprisePlanSaleFormService.resetForm(this.editForm, entreprisePlanSale);

    this.entreprisesSharedCollection = this.entrepriseService.addEntrepriseChadToCollectionIfMissing<IEntrepriseChad>(
      this.entreprisesSharedCollection,
      entreprisePlanSale.entreprise
    );
    this.entreprisePlansSharedCollection = this.entreprisePlanService.addEntreprisePlanChadToCollectionIfMissing<IEntreprisePlanChad>(
      this.entreprisePlansSharedCollection,
      entreprisePlanSale.entreprisePlan
    );
  }

  protected loadRelationshipsOptions(): void {
    this.entrepriseService
      .query()
      .pipe(map((res: HttpResponse<IEntrepriseChad[]>) => res.body ?? []))
      .pipe(
        map((entreprises: IEntrepriseChad[]) =>
          this.entrepriseService.addEntrepriseChadToCollectionIfMissing<IEntrepriseChad>(entreprises, this.entreprisePlanSale?.entreprise)
        )
      )
      .subscribe((entreprises: IEntrepriseChad[]) => (this.entreprisesSharedCollection = entreprises));

    this.entreprisePlanService
      .query()
      .pipe(map((res: HttpResponse<IEntreprisePlanChad[]>) => res.body ?? []))
      .pipe(
        map((entreprisePlans: IEntreprisePlanChad[]) =>
          this.entreprisePlanService.addEntreprisePlanChadToCollectionIfMissing<IEntreprisePlanChad>(
            entreprisePlans,
            this.entreprisePlanSale?.entreprisePlan
          )
        )
      )
      .subscribe((entreprisePlans: IEntreprisePlanChad[]) => (this.entreprisePlansSharedCollection = entreprisePlans));
  }
}
