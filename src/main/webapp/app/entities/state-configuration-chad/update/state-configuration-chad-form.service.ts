import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IStateConfigurationChad, NewStateConfigurationChad } from '../state-configuration-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStateConfigurationChad for edit and NewStateConfigurationChadFormGroupInput for create.
 */
type StateConfigurationChadFormGroupInput = IStateConfigurationChad | PartialWithRequiredKeyOf<NewStateConfigurationChad>;

type StateConfigurationChadFormDefaults = Pick<NewStateConfigurationChad, 'id'>;

type StateConfigurationChadFormGroupContent = {
  id: FormControl<IStateConfigurationChad['id'] | NewStateConfigurationChad['id']>;
  startHour: FormControl<IStateConfigurationChad['startHour']>;
  endHour: FormControl<IStateConfigurationChad['endHour']>;
  statut: FormControl<IStateConfigurationChad['statut']>;
  state: FormControl<IStateConfigurationChad['state']>;
};

export type StateConfigurationChadFormGroup = FormGroup<StateConfigurationChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StateConfigurationChadFormService {
  createStateConfigurationChadFormGroup(
    stateConfiguration: StateConfigurationChadFormGroupInput = { id: null }
  ): StateConfigurationChadFormGroup {
    const stateConfigurationRawValue = {
      ...this.getFormDefaults(),
      ...stateConfiguration,
    };
    return new FormGroup<StateConfigurationChadFormGroupContent>({
      id: new FormControl(
        { value: stateConfigurationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      startHour: new FormControl(stateConfigurationRawValue.startHour, {
        validators: [Validators.required],
      }),
      endHour: new FormControl(stateConfigurationRawValue.endHour, {
        validators: [Validators.required],
      }),
      statut: new FormControl(stateConfigurationRawValue.statut),
      state: new FormControl(stateConfigurationRawValue.state),
    });
  }

  getStateConfigurationChad(form: StateConfigurationChadFormGroup): IStateConfigurationChad | NewStateConfigurationChad {
    return form.getRawValue() as IStateConfigurationChad | NewStateConfigurationChad;
  }

  resetForm(form: StateConfigurationChadFormGroup, stateConfiguration: StateConfigurationChadFormGroupInput): void {
    const stateConfigurationRawValue = { ...this.getFormDefaults(), ...stateConfiguration };
    form.reset(
      {
        ...stateConfigurationRawValue,
        id: { value: stateConfigurationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): StateConfigurationChadFormDefaults {
    return {
      id: null,
    };
  }
}
