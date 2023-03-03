import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IRequestTransactionChad, NewRequestTransactionChad } from '../request-transaction-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRequestTransactionChad for edit and NewRequestTransactionChadFormGroupInput for create.
 */
type RequestTransactionChadFormGroupInput = IRequestTransactionChad | PartialWithRequiredKeyOf<NewRequestTransactionChad>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IRequestTransactionChad | NewRequestTransactionChad> = Omit<T, 'dateTransaction'> & {
  dateTransaction?: string | null;
};

type RequestTransactionChadFormRawValue = FormValueOf<IRequestTransactionChad>;

type NewRequestTransactionChadFormRawValue = FormValueOf<NewRequestTransactionChad>;

type RequestTransactionChadFormDefaults = Pick<NewRequestTransactionChad, 'id' | 'dateTransaction'>;

type RequestTransactionChadFormGroupContent = {
  id: FormControl<RequestTransactionChadFormRawValue['id'] | NewRequestTransactionChad['id']>;
  description: FormControl<RequestTransactionChadFormRawValue['description']>;
  dateTransaction: FormControl<RequestTransactionChadFormRawValue['dateTransaction']>;
  entreprisePlanSale: FormControl<RequestTransactionChadFormRawValue['entreprisePlanSale']>;
  entreprise: FormControl<RequestTransactionChadFormRawValue['entreprise']>;
};

export type RequestTransactionChadFormGroup = FormGroup<RequestTransactionChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RequestTransactionChadFormService {
  createRequestTransactionChadFormGroup(
    requestTransaction: RequestTransactionChadFormGroupInput = { id: null }
  ): RequestTransactionChadFormGroup {
    const requestTransactionRawValue = this.convertRequestTransactionChadToRequestTransactionChadRawValue({
      ...this.getFormDefaults(),
      ...requestTransaction,
    });
    return new FormGroup<RequestTransactionChadFormGroupContent>({
      id: new FormControl(
        { value: requestTransactionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      description: new FormControl(requestTransactionRawValue.description, {
        validators: [Validators.required],
      }),
      dateTransaction: new FormControl(requestTransactionRawValue.dateTransaction),
      entreprisePlanSale: new FormControl(requestTransactionRawValue.entreprisePlanSale),
      entreprise: new FormControl(requestTransactionRawValue.entreprise),
    });
  }

  getRequestTransactionChad(form: RequestTransactionChadFormGroup): IRequestTransactionChad | NewRequestTransactionChad {
    return this.convertRequestTransactionChadRawValueToRequestTransactionChad(
      form.getRawValue() as RequestTransactionChadFormRawValue | NewRequestTransactionChadFormRawValue
    );
  }

  resetForm(form: RequestTransactionChadFormGroup, requestTransaction: RequestTransactionChadFormGroupInput): void {
    const requestTransactionRawValue = this.convertRequestTransactionChadToRequestTransactionChadRawValue({
      ...this.getFormDefaults(),
      ...requestTransaction,
    });
    form.reset(
      {
        ...requestTransactionRawValue,
        id: { value: requestTransactionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RequestTransactionChadFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dateTransaction: currentTime,
    };
  }

  private convertRequestTransactionChadRawValueToRequestTransactionChad(
    rawRequestTransactionChad: RequestTransactionChadFormRawValue | NewRequestTransactionChadFormRawValue
  ): IRequestTransactionChad | NewRequestTransactionChad {
    return {
      ...rawRequestTransactionChad,
      dateTransaction: dayjs(rawRequestTransactionChad.dateTransaction, DATE_TIME_FORMAT),
    };
  }

  private convertRequestTransactionChadToRequestTransactionChadRawValue(
    requestTransaction: IRequestTransactionChad | (Partial<NewRequestTransactionChad> & RequestTransactionChadFormDefaults)
  ): RequestTransactionChadFormRawValue | PartialWithRequiredKeyOf<NewRequestTransactionChadFormRawValue> {
    return {
      ...requestTransaction,
      dateTransaction: requestTransaction.dateTransaction ? requestTransaction.dateTransaction.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
