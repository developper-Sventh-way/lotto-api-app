import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { StateConfigurationChadFormService, StateConfigurationChadFormGroup } from './state-configuration-chad-form.service';
import { IStateConfigurationChad } from '../state-configuration-chad.model';
import { StateConfigurationChadService } from '../service/state-configuration-chad.service';
import { IStateChad } from 'app/entities/state-chad/state-chad.model';
import { StateChadService } from 'app/entities/state-chad/service/state-chad.service';
import { ConfigStatut } from 'app/entities/enumerations/config-statut.model';

@Component({
  selector: 'jhi-state-configuration-chad-update',
  templateUrl: './state-configuration-chad-update.component.html',
})
export class StateConfigurationChadUpdateComponent implements OnInit {
  isSaving = false;
  stateConfiguration: IStateConfigurationChad | null = null;
  configStatutValues = Object.keys(ConfigStatut);

  statesSharedCollection: IStateChad[] = [];

  editForm: StateConfigurationChadFormGroup = this.stateConfigurationFormService.createStateConfigurationChadFormGroup();

  constructor(
    protected stateConfigurationService: StateConfigurationChadService,
    protected stateConfigurationFormService: StateConfigurationChadFormService,
    protected stateService: StateChadService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareStateChad = (o1: IStateChad | null, o2: IStateChad | null): boolean => this.stateService.compareStateChad(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stateConfiguration }) => {
      this.stateConfiguration = stateConfiguration;
      if (stateConfiguration) {
        this.updateForm(stateConfiguration);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stateConfiguration = this.stateConfigurationFormService.getStateConfigurationChad(this.editForm);
    if (stateConfiguration.id !== null) {
      this.subscribeToSaveResponse(this.stateConfigurationService.update(stateConfiguration));
    } else {
      this.subscribeToSaveResponse(this.stateConfigurationService.create(stateConfiguration));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStateConfigurationChad>>): void {
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

  protected updateForm(stateConfiguration: IStateConfigurationChad): void {
    this.stateConfiguration = stateConfiguration;
    this.stateConfigurationFormService.resetForm(this.editForm, stateConfiguration);

    this.statesSharedCollection = this.stateService.addStateChadToCollectionIfMissing<IStateChad>(
      this.statesSharedCollection,
      stateConfiguration.state
    );
  }

  protected loadRelationshipsOptions(): void {
    this.stateService
      .query()
      .pipe(map((res: HttpResponse<IStateChad[]>) => res.body ?? []))
      .pipe(
        map((states: IStateChad[]) =>
          this.stateService.addStateChadToCollectionIfMissing<IStateChad>(states, this.stateConfiguration?.state)
        )
      )
      .subscribe((states: IStateChad[]) => (this.statesSharedCollection = states));
  }
}
