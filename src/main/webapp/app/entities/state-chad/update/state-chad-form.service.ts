import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IStateChad, NewStateChad } from '../state-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStateChad for edit and NewStateChadFormGroupInput for create.
 */
type StateChadFormGroupInput = IStateChad | PartialWithRequiredKeyOf<NewStateChad>;

type StateChadFormDefaults = Pick<NewStateChad, 'id'>;

type StateChadFormGroupContent = {
  id: FormControl<IStateChad['id'] | NewStateChad['id']>;
  name: FormControl<IStateChad['name']>;
};

export type StateChadFormGroup = FormGroup<StateChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StateChadFormService {
  createStateChadFormGroup(state: StateChadFormGroupInput = { id: null }): StateChadFormGroup {
    const stateRawValue = {
      ...this.getFormDefaults(),
      ...state,
    };
    return new FormGroup<StateChadFormGroupContent>({
      id: new FormControl(
        { value: stateRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(stateRawValue.name, {
        validators: [Validators.required],
      }),
    });
  }

  getStateChad(form: StateChadFormGroup): IStateChad | NewStateChad {
    return form.getRawValue() as IStateChad | NewStateChad;
  }

  resetForm(form: StateChadFormGroup, state: StateChadFormGroupInput): void {
    const stateRawValue = { ...this.getFormDefaults(), ...state };
    form.reset(
      {
        ...stateRawValue,
        id: { value: stateRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): StateChadFormDefaults {
    return {
      id: null,
    };
  }
}
