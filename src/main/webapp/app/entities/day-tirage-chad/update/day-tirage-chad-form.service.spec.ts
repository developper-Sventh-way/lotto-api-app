import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../day-tirage-chad.test-samples';

import { DayTirageChadFormService } from './day-tirage-chad-form.service';

describe('DayTirageChad Form Service', () => {
  let service: DayTirageChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayTirageChadFormService);
  });

  describe('Service methods', () => {
    describe('createDayTirageChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDayTirageChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tirageType: expect.any(Object),
            dateInString: expect.any(Object),
            premierLot: expect.any(Object),
            deuxiemeLot: expect.any(Object),
            troisiemeLot: expect.any(Object),
            pic3: expect.any(Object),
            win4: expect.any(Object),
            dateTransaction: expect.any(Object),
            state: expect.any(Object),
          })
        );
      });

      it('passing IDayTirageChad should create a new form with FormGroup', () => {
        const formGroup = service.createDayTirageChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tirageType: expect.any(Object),
            dateInString: expect.any(Object),
            premierLot: expect.any(Object),
            deuxiemeLot: expect.any(Object),
            troisiemeLot: expect.any(Object),
            pic3: expect.any(Object),
            win4: expect.any(Object),
            dateTransaction: expect.any(Object),
            state: expect.any(Object),
          })
        );
      });
    });

    describe('getDayTirageChad', () => {
      it('should return NewDayTirageChad for default DayTirageChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createDayTirageChadFormGroup(sampleWithNewData);

        const dayTirage = service.getDayTirageChad(formGroup) as any;

        expect(dayTirage).toMatchObject(sampleWithNewData);
      });

      it('should return NewDayTirageChad for empty DayTirageChad initial value', () => {
        const formGroup = service.createDayTirageChadFormGroup();

        const dayTirage = service.getDayTirageChad(formGroup) as any;

        expect(dayTirage).toMatchObject({});
      });

      it('should return IDayTirageChad', () => {
        const formGroup = service.createDayTirageChadFormGroup(sampleWithRequiredData);

        const dayTirage = service.getDayTirageChad(formGroup) as any;

        expect(dayTirage).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDayTirageChad should not enable id FormControl', () => {
        const formGroup = service.createDayTirageChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDayTirageChad should disable id FormControl', () => {
        const formGroup = service.createDayTirageChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
