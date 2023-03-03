import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../request-transaction-chad.test-samples';

import { RequestTransactionChadFormService } from './request-transaction-chad-form.service';

describe('RequestTransactionChad Form Service', () => {
  let service: RequestTransactionChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestTransactionChadFormService);
  });

  describe('Service methods', () => {
    describe('createRequestTransactionChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRequestTransactionChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            dateTransaction: expect.any(Object),
            entreprisePlanSale: expect.any(Object),
            entreprise: expect.any(Object),
          })
        );
      });

      it('passing IRequestTransactionChad should create a new form with FormGroup', () => {
        const formGroup = service.createRequestTransactionChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            dateTransaction: expect.any(Object),
            entreprisePlanSale: expect.any(Object),
            entreprise: expect.any(Object),
          })
        );
      });
    });

    describe('getRequestTransactionChad', () => {
      it('should return NewRequestTransactionChad for default RequestTransactionChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createRequestTransactionChadFormGroup(sampleWithNewData);

        const requestTransaction = service.getRequestTransactionChad(formGroup) as any;

        expect(requestTransaction).toMatchObject(sampleWithNewData);
      });

      it('should return NewRequestTransactionChad for empty RequestTransactionChad initial value', () => {
        const formGroup = service.createRequestTransactionChadFormGroup();

        const requestTransaction = service.getRequestTransactionChad(formGroup) as any;

        expect(requestTransaction).toMatchObject({});
      });

      it('should return IRequestTransactionChad', () => {
        const formGroup = service.createRequestTransactionChadFormGroup(sampleWithRequiredData);

        const requestTransaction = service.getRequestTransactionChad(formGroup) as any;

        expect(requestTransaction).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRequestTransactionChad should not enable id FormControl', () => {
        const formGroup = service.createRequestTransactionChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRequestTransactionChad should disable id FormControl', () => {
        const formGroup = service.createRequestTransactionChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
