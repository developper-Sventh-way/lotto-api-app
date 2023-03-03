import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IDayTirageChad, NewDayTirageChad } from '../day-tirage-chad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDayTirageChad for edit and NewDayTirageChadFormGroupInput for create.
 */
type DayTirageChadFormGroupInput = IDayTirageChad | PartialWithRequiredKeyOf<NewDayTirageChad>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IDayTirageChad | NewDayTirageChad> = Omit<T, 'dateTransaction'> & {
  dateTransaction?: string | null;
};

type DayTirageChadFormRawValue = FormValueOf<IDayTirageChad>;

type NewDayTirageChadFormRawValue = FormValueOf<NewDayTirageChad>;

type DayTirageChadFormDefaults = Pick<NewDayTirageChad, 'id' | 'dateTransaction'>;

type DayTirageChadFormGroupContent = {
  id: FormControl<DayTirageChadFormRawValue['id'] | NewDayTirageChad['id']>;
  tirageType: FormControl<DayTirageChadFormRawValue['tirageType']>;
  dateInString: FormControl<DayTirageChadFormRawValue['dateInString']>;
  premierLot: FormControl<DayTirageChadFormRawValue['premierLot']>;
  deuxiemeLot: FormControl<DayTirageChadFormRawValue['deuxiemeLot']>;
  troisiemeLot: FormControl<DayTirageChadFormRawValue['troisiemeLot']>;
  pic3: FormControl<DayTirageChadFormRawValue['pic3']>;
  win4: FormControl<DayTirageChadFormRawValue['win4']>;
  dateTransaction: FormControl<DayTirageChadFormRawValue['dateTransaction']>;
  state: FormControl<DayTirageChadFormRawValue['state']>;
};

export type DayTirageChadFormGroup = FormGroup<DayTirageChadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DayTirageChadFormService {
  createDayTirageChadFormGroup(dayTirage: DayTirageChadFormGroupInput = { id: null }): DayTirageChadFormGroup {
    const dayTirageRawValue = this.convertDayTirageChadToDayTirageChadRawValue({
      ...this.getFormDefaults(),
      ...dayTirage,
    });
    return new FormGroup<DayTirageChadFormGroupContent>({
      id: new FormControl(
        { value: dayTirageRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      tirageType: new FormControl(dayTirageRawValue.tirageType, {
        validators: [Validators.required],
      }),
      dateInString: new FormControl(dayTirageRawValue.dateInString),
      premierLot: new FormControl(dayTirageRawValue.premierLot),
      deuxiemeLot: new FormControl(dayTirageRawValue.deuxiemeLot),
      troisiemeLot: new FormControl(dayTirageRawValue.troisiemeLot),
      pic3: new FormControl(dayTirageRawValue.pic3),
      win4: new FormControl(dayTirageRawValue.win4),
      dateTransaction: new FormControl(dayTirageRawValue.dateTransaction),
      state: new FormControl(dayTirageRawValue.state),
    });
  }

  getDayTirageChad(form: DayTirageChadFormGroup): IDayTirageChad | NewDayTirageChad {
    return this.convertDayTirageChadRawValueToDayTirageChad(form.getRawValue() as DayTirageChadFormRawValue | NewDayTirageChadFormRawValue);
  }

  resetForm(form: DayTirageChadFormGroup, dayTirage: DayTirageChadFormGroupInput): void {
    const dayTirageRawValue = this.convertDayTirageChadToDayTirageChadRawValue({ ...this.getFormDefaults(), ...dayTirage });
    form.reset(
      {
        ...dayTirageRawValue,
        id: { value: dayTirageRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DayTirageChadFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dateTransaction: currentTime,
    };
  }

  private convertDayTirageChadRawValueToDayTirageChad(
    rawDayTirageChad: DayTirageChadFormRawValue | NewDayTirageChadFormRawValue
  ): IDayTirageChad | NewDayTirageChad {
    return {
      ...rawDayTirageChad,
      dateTransaction: dayjs(rawDayTirageChad.dateTransaction, DATE_TIME_FORMAT),
    };
  }

  private convertDayTirageChadToDayTirageChadRawValue(
    dayTirage: IDayTirageChad | (Partial<NewDayTirageChad> & DayTirageChadFormDefaults)
  ): DayTirageChadFormRawValue | PartialWithRequiredKeyOf<NewDayTirageChadFormRawValue> {
    return {
      ...dayTirage,
      dateTransaction: dayTirage.dateTransaction ? dayTirage.dateTransaction.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
