import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEntreprisePlanPermissionChad, NewEntreprisePlanPermissionChad } from '../entreprise-plan-permission-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEntreprisePlanPermissionChad for edit and NewEntreprisePlanPermissionChadFormGroupInput for create.
 */
type EntreprisePlanPermissionChadFormGroupInput = IEntreprisePlanPermissionChad | PartialWithRequiredKeyOf<NewEntreprisePlanPermissionChad>;

type EntreprisePlanPermissionChadFormDefaults = Pick<NewEntreprisePlanPermissionChad, 'id'>;

type EntreprisePlanPermissionChadFormGroupContent = {
  id: FormControl<IEntreprisePlanPermissionChad['id'] | NewEntreprisePlanPermissionChad['id']>;
  description: FormControl<IEntreprisePlanPermissionChad['description']>;
  entreprisePlan: FormControl<IEntreprisePlanPermissionChad['entreprisePlan']>;
  state: FormControl<IEntreprisePlanPermissionChad['state']>;
};

export type EntreprisePlanPermissionChadFormGroup = FormGroup<EntreprisePlanPermissionChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EntreprisePlanPermissionChadFormService {
  createEntreprisePlanPermissionChadFormGroup(
    entreprisePlanPermission: EntreprisePlanPermissionChadFormGroupInput = { id: null }
  ): EntreprisePlanPermissionChadFormGroup {
    const entreprisePlanPermissionRawValue = {
      ...this.getFormDefaults(),
      ...entreprisePlanPermission,
    };
    return new FormGroup<EntreprisePlanPermissionChadFormGroupContent>({
      id: new FormControl(
        { value: entreprisePlanPermissionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      description: new FormControl(entreprisePlanPermissionRawValue.description),
      entreprisePlan: new FormControl(entreprisePlanPermissionRawValue.entreprisePlan),
      state: new FormControl(entreprisePlanPermissionRawValue.state),
    });
  }

  getEntreprisePlanPermissionChad(
    form: EntreprisePlanPermissionChadFormGroup
  ): IEntreprisePlanPermissionChad | NewEntreprisePlanPermissionChad {
    return form.getRawValue() as IEntreprisePlanPermissionChad | NewEntreprisePlanPermissionChad;
  }

  resetForm(form: EntreprisePlanPermissionChadFormGroup, entreprisePlanPermission: EntreprisePlanPermissionChadFormGroupInput): void {
    const entreprisePlanPermissionRawValue = { ...this.getFormDefaults(), ...entreprisePlanPermission };
    form.reset(
      {
        ...entreprisePlanPermissionRawValue,
        id: { value: entreprisePlanPermissionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EntreprisePlanPermissionChadFormDefaults {
    return {
      id: null,
    };
  }
}
