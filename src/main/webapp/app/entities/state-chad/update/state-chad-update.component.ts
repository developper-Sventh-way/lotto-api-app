import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { StateChadFormService, StateChadFormGroup } from './state-chad-form.service';
import { IStateChad } from '../state-chad.model';
import { StateChadService } from '../service/state-chad.service';

@Component({
  selector: 'jhi-state-chad-update',
  templateUrl: './state-chad-update.component.html',
})
export class StateChadUpdateComponent implements OnInit {
  isSaving = false;
  state: IStateChad | null = null;

  editForm: StateChadFormGroup = this.stateFormService.createStateChadFormGroup();

  constructor(
    protected stateService: StateChadService,
    protected stateFormService: StateChadFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ state }) => {
      this.state = state;
      if (state) {
        this.updateForm(state);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const state = this.stateFormService.getStateChad(this.editForm);
    if (state.id !== null) {
      this.subscribeToSaveResponse(this.stateService.update(state));
    } else {
      this.subscribeToSaveResponse(this.stateService.create(state));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStateChad>>): void {
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

  protected updateForm(state: IStateChad): void {
    this.state = state;
    this.stateFormService.resetForm(this.editForm, state);
  }
}
