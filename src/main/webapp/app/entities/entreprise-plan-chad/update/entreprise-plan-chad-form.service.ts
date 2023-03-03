import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEntreprisePlanChad, NewEntreprisePlanChad } from '../entreprise-plan-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEntreprisePlanChad for edit and NewEntreprisePlanChadFormGroupInput for create.
 */
type EntreprisePlanChadFormGroupInput = IEntreprisePlanChad | PartialWithRequiredKeyOf<NewEntreprisePlanChad>;

type EntreprisePlanChadFormDefaults = Pick<NewEntreprisePlanChad, 'id'>;

type EntreprisePlanChadFormGroupContent = {
  id: FormControl<IEntreprisePlanChad['id'] | NewEntreprisePlanChad['id']>;
  prix: FormControl<IEntreprisePlanChad['prix']>;
  name: FormControl<IEntreprisePlanChad['name']>;
  type: FormControl<IEntreprisePlanChad['type']>;
  avantage: FormControl<IEntreprisePlanChad['avantage']>;
  requestPerDay: FormControl<IEntreprisePlanChad['requestPerDay']>;
};

export type EntreprisePlanChadFormGroup = FormGroup<EntreprisePlanChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EntreprisePlanChadFormService {
  createEntreprisePlanChadFormGroup(entreprisePlan: EntreprisePlanChadFormGroupInput = { id: null }): EntreprisePlanChadFormGroup {
    const entreprisePlanRawValue = {
      ...this.getFormDefaults(),
      ...entreprisePlan,
    };
    return new FormGroup<EntreprisePlanChadFormGroupContent>({
      id: new FormControl(
        { value: entreprisePlanRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      prix: new FormControl(entreprisePlanRawValue.prix, {
        validators: [Validators.required],
      }),
      name: new FormControl(entreprisePlanRawValue.name, {
        validators: [Validators.required],
      }),
      type: new FormControl(entreprisePlanRawValue.type, {
        validators: [Validators.required],
      }),
      avantage: new FormControl(entreprisePlanRawValue.avantage),
      requestPerDay: new FormControl(entreprisePlanRawValue.requestPerDay),
    });
  }

  getEntreprisePlanChad(form: EntreprisePlanChadFormGroup): IEntreprisePlanChad | NewEntreprisePlanChad {
    return form.getRawValue() as IEntreprisePlanChad | NewEntreprisePlanChad;
  }

  resetForm(form: EntreprisePlanChadFormGroup, entreprisePlan: EntreprisePlanChadFormGroupInput): void {
    const entreprisePlanRawValue = { ...this.getFormDefaults(), ...entreprisePlan };
    form.reset(
      {
        ...entreprisePlanRawValue,
        id: { value: entreprisePlanRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EntreprisePlanChadFormDefaults {
    return {
      id: null,
    };
  }
}
