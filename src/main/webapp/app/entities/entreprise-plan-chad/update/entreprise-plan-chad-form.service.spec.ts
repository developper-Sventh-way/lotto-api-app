import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../entreprise-plan-chad.test-samples';

import { EntreprisePlanChadFormService } from './entreprise-plan-chad-form.service';

describe('EntreprisePlanChad Form Service', () => {
  let service: EntreprisePlanChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntreprisePlanChadFormService);
  });

  describe('Service methods', () => {
    describe('createEntreprisePlanChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEntreprisePlanChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            prix: expect.any(Object),
            name: expect.any(Object),
            type: expect.any(Object),
            avantage: expect.any(Object),
            requestPerDay: expect.any(Object),
          })
        );
      });

      it('passing IEntreprisePlanChad should create a new form with FormGroup', () => {
        const formGroup = service.createEntreprisePlanChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            prix: expect.any(Object),
            name: expect.any(Object),
            type: expect.any(Object),
            avantage: expect.any(Object),
            requestPerDay: expect.any(Object),
          })
        );
      });
    });

    describe('getEntreprisePlanChad', () => {
      it('should return NewEntreprisePlanChad for default EntreprisePlanChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEntreprisePlanChadFormGroup(sampleWithNewData);

        const entreprisePlan = service.getEntreprisePlanChad(formGroup) as any;

        expect(entreprisePlan).toMatchObject(sampleWithNewData);
      });

      it('should return NewEntreprisePlanChad for empty EntreprisePlanChad initial value', () => {
        const formGroup = service.createEntreprisePlanChadFormGroup();

        const entreprisePlan = service.getEntreprisePlanChad(formGroup) as any;

        expect(entreprisePlan).toMatchObject({});
      });

      it('should return IEntreprisePlanChad', () => {
        const formGroup = service.createEntreprisePlanChadFormGroup(sampleWithRequiredData);

        const entreprisePlan = service.getEntreprisePlanChad(formGroup) as any;

        expect(entreprisePlan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEntreprisePlanChad should not enable id FormControl', () => {
        const formGroup = service.createEntreprisePlanChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEntreprisePlanChad should disable id FormControl', () => {
        const formGroup = service.createEntreprisePlanChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
