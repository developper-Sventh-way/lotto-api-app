import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../entreprise-plan-sale-chad.test-samples';

import { EntreprisePlanSaleChadFormService } from './entreprise-plan-sale-chad-form.service';

describe('EntreprisePlanSaleChad Form Service', () => {
  let service: EntreprisePlanSaleChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntreprisePlanSaleChadFormService);
  });

  describe('Service methods', () => {
    describe('createEntreprisePlanSaleChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEntreprisePlanSaleChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            token: expect.any(Object),
            startDate: expect.any(Object),
            expirateDate: expect.any(Object),
            statut: expect.any(Object),
            entreprise: expect.any(Object),
            entreprisePlan: expect.any(Object),
          })
        );
      });

      it('passing IEntreprisePlanSaleChad should create a new form with FormGroup', () => {
        const formGroup = service.createEntreprisePlanSaleChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            token: expect.any(Object),
            startDate: expect.any(Object),
            expirateDate: expect.any(Object),
            statut: expect.any(Object),
            entreprise: expect.any(Object),
            entreprisePlan: expect.any(Object),
          })
        );
      });
    });

    describe('getEntreprisePlanSaleChad', () => {
      it('should return NewEntreprisePlanSaleChad for default EntreprisePlanSaleChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEntreprisePlanSaleChadFormGroup(sampleWithNewData);

        const entreprisePlanSale = service.getEntreprisePlanSaleChad(formGroup) as any;

        expect(entreprisePlanSale).toMatchObject(sampleWithNewData);
      });

      it('should return NewEntreprisePlanSaleChad for empty EntreprisePlanSaleChad initial value', () => {
        const formGroup = service.createEntreprisePlanSaleChadFormGroup();

        const entreprisePlanSale = service.getEntreprisePlanSaleChad(formGroup) as any;

        expect(entreprisePlanSale).toMatchObject({});
      });

      it('should return IEntreprisePlanSaleChad', () => {
        const formGroup = service.createEntreprisePlanSaleChadFormGroup(sampleWithRequiredData);

        const entreprisePlanSale = service.getEntreprisePlanSaleChad(formGroup) as any;

        expect(entreprisePlanSale).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEntreprisePlanSaleChad should not enable id FormControl', () => {
        const formGroup = service.createEntreprisePlanSaleChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEntreprisePlanSaleChad should disable id FormControl', () => {
        const formGroup = service.createEntreprisePlanSaleChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
