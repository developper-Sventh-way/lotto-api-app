import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { RequestTransactionChadFormService, RequestTransactionChadFormGroup } from './request-transaction-chad-form.service';
import { IRequestTransactionChad } from '../request-transaction-chad.model';
import { RequestTransactionChadService } from '../service/request-transaction-chad.service';
import { IEntreprisePlanSaleChad } from 'app/entities/entreprise-plan-sale-chad/entreprise-plan-sale-chad.model';
import { EntreprisePlanSaleChadService } from 'app/entities/entreprise-plan-sale-chad/service/entreprise-plan-sale-chad.service';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { EntrepriseChadService } from 'app/entities/entreprise-chad/service/entreprise-chad.service';

@Component({
  selector: 'jhi-request-transaction-chad-update',
  templateUrl: './request-transaction-chad-update.component.html',
})
export class RequestTransactionChadUpdateComponent implements OnInit {
  isSaving = false;
  requestTransaction: IRequestTransactionChad | null = null;

  entreprisePlanSalesSharedCollection: IEntreprisePlanSaleChad[] = [];
  entreprisesSharedCollection: IEntrepriseChad[] = [];

  editForm: RequestTransactionChadFormGroup = this.requestTransactionFormService.createRequestTransactionChadFormGroup();

  constructor(
    protected requestTransactionService: RequestTransactionChadService,
    protected requestTransactionFormService: RequestTransactionChadFormService,
    protected entreprisePlanSaleService: EntreprisePlanSaleChadService,
    protected entrepriseService: EntrepriseChadService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareEntreprisePlanSaleChad = (o1: IEntreprisePlanSaleChad | null, o2: IEntreprisePlanSaleChad | null): boolean =>
    this.entreprisePlanSaleService.compareEntreprisePlanSaleChad(o1, o2);

  compareEntrepriseChad = (o1: IEntrepriseChad | null, o2: IEntrepriseChad | null): boolean =>
    this.entrepriseService.compareEntrepriseChad(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ requestTransaction }) => {
      this.requestTransaction = requestTransaction;
      if (requestTransaction) {
        this.updateForm(requestTransaction);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const requestTransaction = this.requestTransactionFormService.getRequestTransactionChad(this.editForm);
    if (requestTransaction.id !== null) {
      this.subscribeToSaveResponse(this.requestTransactionService.update(requestTransaction));
    } else {
      this.subscribeToSaveResponse(this.requestTransactionService.create(requestTransaction));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRequestTransactionChad>>): void {
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

  protected updateForm(requestTransaction: IRequestTransactionChad): void {
    this.requestTransaction = requestTransaction;
    this.requestTransactionFormService.resetForm(this.editForm, requestTransaction);

    this.entreprisePlanSalesSharedCollection =
      this.entreprisePlanSaleService.addEntreprisePlanSaleChadToCollectionIfMissing<IEntreprisePlanSaleChad>(
        this.entreprisePlanSalesSharedCollection,
        requestTransaction.entreprisePlanSale
      );
    this.entreprisesSharedCollection = this.entrepriseService.addEntrepriseChadToCollectionIfMissing<IEntrepriseChad>(
      this.entreprisesSharedCollection,
      requestTransaction.entreprise
    );
  }

  protected loadRelationshipsOptions(): void {
    this.entreprisePlanSaleService
      .query()
      .pipe(map((res: HttpResponse<IEntreprisePlanSaleChad[]>) => res.body ?? []))
      .pipe(
        map((entreprisePlanSales: IEntreprisePlanSaleChad[]) =>
          this.entreprisePlanSaleService.addEntreprisePlanSaleChadToCollectionIfMissing<IEntreprisePlanSaleChad>(
            entreprisePlanSales,
            this.requestTransaction?.entreprisePlanSale
          )
        )
      )
      .subscribe((entreprisePlanSales: IEntreprisePlanSaleChad[]) => (this.entreprisePlanSalesSharedCollection = entreprisePlanSales));

    this.entrepriseService
      .query()
      .pipe(map((res: HttpResponse<IEntrepriseChad[]>) => res.body ?? []))
      .pipe(
        map((entreprises: IEntrepriseChad[]) =>
          this.entrepriseService.addEntrepriseChadToCollectionIfMissing<IEntrepriseChad>(entreprises, this.requestTransaction?.entreprise)
        )
      )
      .subscribe((entreprises: IEntrepriseChad[]) => (this.entreprisesSharedCollection = entreprises));
  }
}
