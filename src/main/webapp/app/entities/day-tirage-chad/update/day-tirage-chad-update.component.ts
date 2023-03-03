import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DayTirageChadFormService, DayTirageChadFormGroup } from './day-tirage-chad-form.service';
import { IDayTirageChad } from '../day-tirage-chad.model';
import { DayTirageChadService } from '../service/day-tirage-chad.service';
import { IStateChad } from 'app/entities/state-chad/state-chad.model';
import { StateChadService } from 'app/entities/state-chad/service/state-chad.service';
import { TirageType } from 'app/entities/enumerations/tirage-type.model';

@Component({
  selector: 'jhi-day-tirage-chad-update',
  templateUrl: './day-tirage-chad-update.component.html',
})
export class DayTirageChadUpdateComponent implements OnInit {
  isSaving = false;
  dayTirage: IDayTirageChad | null = null;
  tirageTypeValues = Object.keys(TirageType);

  statesSharedCollection: IStateChad[] = [];

  editForm: DayTirageChadFormGroup = this.dayTirageFormService.createDayTirageChadFormGroup();

  constructor(
    protected dayTirageService: DayTirageChadService,
    protected dayTirageFormService: DayTirageChadFormService,
    protected stateService: StateChadService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareStateChad = (o1: IStateChad | null, o2: IStateChad | null): boolean => this.stateService.compareStateChad(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dayTirage }) => {
      this.dayTirage = dayTirage;
      if (dayTirage) {
        this.updateForm(dayTirage);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dayTirage = this.dayTirageFormService.getDayTirageChad(this.editForm);
    if (dayTirage.id !== null) {
      this.subscribeToSaveResponse(this.dayTirageService.update(dayTirage));
    } else {
      this.subscribeToSaveResponse(this.dayTirageService.create(dayTirage));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDayTirageChad>>): void {
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

  protected updateForm(dayTirage: IDayTirageChad): void {
    this.dayTirage = dayTirage;
    this.dayTirageFormService.resetForm(this.editForm, dayTirage);

    this.statesSharedCollection = this.stateService.addStateChadToCollectionIfMissing<IStateChad>(
      this.statesSharedCollection,
      dayTirage.state
    );
  }

  protected loadRelationshipsOptions(): void {
    this.stateService
      .query()
      .pipe(map((res: HttpResponse<IStateChad[]>) => res.body ?? []))
      .pipe(map((states: IStateChad[]) => this.stateService.addStateChadToCollectionIfMissing<IStateChad>(states, this.dayTirage?.state)))
      .subscribe((states: IStateChad[]) => (this.statesSharedCollection = states));
  }
}
