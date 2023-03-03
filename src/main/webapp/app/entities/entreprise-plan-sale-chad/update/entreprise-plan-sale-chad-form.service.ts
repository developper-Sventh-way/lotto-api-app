import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEntreprisePlanSaleChad, NewEntreprisePlanSaleChad } from '../entreprise-plan-sale-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEntreprisePlanSaleChad for edit and NewEntreprisePlanSaleChadFormGroupInput for create.
 */
type EntreprisePlanSaleChadFormGroupInput = IEntreprisePlanSaleChad | PartialWithRequiredKeyOf<NewEntreprisePlanSaleChad>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IEntreprisePlanSaleChad | NewEntreprisePlanSaleChad> = Omit<T, 'startDate' | 'expirateDate'> & {
  startDate?: string | null;
  expirateDate?: string | null;
};

type EntreprisePlanSaleChadFormRawValue = FormValueOf<IEntreprisePlanSaleChad>;

type NewEntreprisePlanSaleChadFormRawValue = FormValueOf<NewEntreprisePlanSaleChad>;

type EntreprisePlanSaleChadFormDefaults = Pick<NewEntreprisePlanSaleChad, 'id' | 'startDate' | 'expirateDate'>;

type EntreprisePlanSaleChadFormGroupContent = {
  id: FormControl<EntreprisePlanSaleChadFormRawValue['id'] | NewEntreprisePlanSaleChad['id']>;
  token: FormControl<EntreprisePlanSaleChadFormRawValue['token']>;
  startDate: FormControl<EntreprisePlanSaleChadFormRawValue['startDate']>;
  expirateDate: FormControl<EntreprisePlanSaleChadFormRawValue['expirateDate']>;
  statut: FormControl<EntreprisePlanSaleChadFormRawValue['statut']>;
  entreprise: FormControl<EntreprisePlanSaleChadFormRawValue['entreprise']>;
  entreprisePlan: FormControl<EntreprisePlanSaleChadFormRawValue['entreprisePlan']>;
};

export type EntreprisePlanSaleChadFormGroup = FormGroup<EntreprisePlanSaleChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EntreprisePlanSaleChadFormService {
  createEntreprisePlanSaleChadFormGroup(
    entreprisePlanSale: EntreprisePlanSaleChadFormGroupInput = { id: null }
  ): EntreprisePlanSaleChadFormGroup {
    const entreprisePlanSaleRawValue = this.convertEntreprisePlanSaleChadToEntreprisePlanSaleChadRawValue({
      ...this.getFormDefaults(),
      ...entreprisePlanSale,
    });
    return new FormGroup<EntreprisePlanSaleChadFormGroupContent>({
      id: new FormControl(
        { value: entreprisePlanSaleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      token: new FormControl(entreprisePlanSaleRawValue.token, {
        validators: [Validators.required],
      }),
      startDate: new FormControl(entreprisePlanSaleRawValue.startDate),
      expirateDate: new FormControl(entreprisePlanSaleRawValue.expirateDate),
      statut: new FormControl(entreprisePlanSaleRawValue.statut, {
        validators: [Validators.required],
      }),
      entreprise: new FormControl(entreprisePlanSaleRawValue.entreprise),
      entreprisePlan: new FormControl(entreprisePlanSaleRawValue.entreprisePlan),
    });
  }

  getEntreprisePlanSaleChad(form: EntreprisePlanSaleChadFormGroup): IEntreprisePlanSaleChad | NewEntreprisePlanSaleChad {
    return this.convertEntreprisePlanSaleChadRawValueToEntreprisePlanSaleChad(
      form.getRawValue() as EntreprisePlanSaleChadFormRawValue | NewEntreprisePlanSaleChadFormRawValue
    );
  }

  resetForm(form: EntreprisePlanSaleChadFormGroup, entreprisePlanSale: EntreprisePlanSaleChadFormGroupInput): void {
    const entreprisePlanSaleRawValue = this.convertEntreprisePlanSaleChadToEntreprisePlanSaleChadRawValue({
      ...this.getFormDefaults(),
      ...entreprisePlanSale,
    });
    form.reset(
      {
        ...entreprisePlanSaleRawValue,
        id: { value: entreprisePlanSaleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EntreprisePlanSaleChadFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startDate: currentTime,
      expirateDate: currentTime,
    };
  }

  private convertEntreprisePlanSaleChadRawValueToEntreprisePlanSaleChad(
    rawEntreprisePlanSaleChad: EntreprisePlanSaleChadFormRawValue | NewEntreprisePlanSaleChadFormRawValue
  ): IEntreprisePlanSaleChad | NewEntreprisePlanSaleChad {
    return {
      ...rawEntreprisePlanSaleChad,
      startDate: dayjs(rawEntreprisePlanSaleChad.startDate, DATE_TIME_FORMAT),
      expirateDate: dayjs(rawEntreprisePlanSaleChad.expirateDate, DATE_TIME_FORMAT),
    };
  }

  private convertEntreprisePlanSaleChadToEntreprisePlanSaleChadRawValue(
    entreprisePlanSale: IEntreprisePlanSaleChad | (Partial<NewEntreprisePlanSaleChad> & EntreprisePlanSaleChadFormDefaults)
  ): EntreprisePlanSaleChadFormRawValue | PartialWithRequiredKeyOf<NewEntreprisePlanSaleChadFormRawValue> {
    return {
      ...entreprisePlanSale,
      startDate: entreprisePlanSale.startDate ? entreprisePlanSale.startDate.format(DATE_TIME_FORMAT) : undefined,
      expirateDate: entreprisePlanSale.expirateDate ? entreprisePlanSale.expirateDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
