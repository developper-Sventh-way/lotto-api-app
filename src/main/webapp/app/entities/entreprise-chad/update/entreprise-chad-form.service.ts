import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IEntrepriseChad, NewEntrepriseChad } from '../entreprise-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEntrepriseChad for edit and NewEntrepriseChadFormGroupInput for create.
 */
type EntrepriseChadFormGroupInput = IEntrepriseChad | PartialWithRequiredKeyOf<NewEntrepriseChad>;

type EntrepriseChadFormDefaults = Pick<NewEntrepriseChad, 'id'>;

type EntrepriseChadFormGroupContent = {
  id: FormControl<IEntrepriseChad['id'] | NewEntrepriseChad['id']>;
  name: FormControl<IEntrepriseChad['name']>;
  representant: FormControl<IEntrepriseChad['representant']>;
  cin: FormControl<IEntrepriseChad['cin']>;
  nif: FormControl<IEntrepriseChad['nif']>;
};

export type EntrepriseChadFormGroup = FormGroup<EntrepriseChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EntrepriseChadFormService {
  createEntrepriseChadFormGroup(entreprise: EntrepriseChadFormGroupInput = { id: null }): EntrepriseChadFormGroup {
    const entrepriseRawValue = {
      ...this.getFormDefaults(),
      ...entreprise,
    };
    return new FormGroup<EntrepriseChadFormGroupContent>({
      id: new FormControl(
        { value: entrepriseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(entrepriseRawValue.name, {
        validators: [Validators.required],
      }),
      representant: new FormControl(entrepriseRawValue.representant, {
        validators: [Validators.required],
      }),
      cin: new FormControl(entrepriseRawValue.cin),
      nif: new FormControl(entrepriseRawValue.nif),
    });
  }

  getEntrepriseChad(form: EntrepriseChadFormGroup): IEntrepriseChad | NewEntrepriseChad {
    return form.getRawValue() as IEntrepriseChad | NewEntrepriseChad;
  }

  resetForm(form: EntrepriseChadFormGroup, entreprise: EntrepriseChadFormGroupInput): void {
    const entrepriseRawValue = { ...this.getFormDefaults(), ...entreprise };
    form.reset(
      {
        ...entrepriseRawValue,
        id: { value: entrepriseRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EntrepriseChadFormDefaults {
    return {
      id: null,
    };
  }
}
