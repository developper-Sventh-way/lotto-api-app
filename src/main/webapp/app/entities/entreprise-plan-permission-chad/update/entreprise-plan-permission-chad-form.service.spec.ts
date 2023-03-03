import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../entreprise-plan-permission-chad.test-samples';

import { EntreprisePlanPermissionChadFormService } from './entreprise-plan-permission-chad-form.service';

describe('EntreprisePlanPermissionChad Form Service', () => {
  let service: EntreprisePlanPermissionChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntreprisePlanPermissionChadFormService);
  });

  describe('Service methods', () => {
    describe('createEntreprisePlanPermissionChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEntreprisePlanPermissionChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            entreprisePlan: expect.any(Object),
            state: expect.any(Object),
          })
        );
      });

      it('passing IEntreprisePlanPermissionChad should create a new form with FormGroup', () => {
        const formGroup = service.createEntreprisePlanPermissionChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            description: expect.any(Object),
            entreprisePlan: expect.any(Object),
            state: expect.any(Object),
          })
        );
      });
    });

    describe('getEntreprisePlanPermissionChad', () => {
      it('should return NewEntreprisePlanPermissionChad for default EntreprisePlanPermissionChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEntreprisePlanPermissionChadFormGroup(sampleWithNewData);

        const entreprisePlanPermission = service.getEntreprisePlanPermissionChad(formGroup) as any;

        expect(entreprisePlanPermission).toMatchObject(sampleWithNewData);
      });

      it('should return NewEntreprisePlanPermissionChad for empty EntreprisePlanPermissionChad initial value', () => {
        const formGroup = service.createEntreprisePlanPermissionChadFormGroup();

        const entreprisePlanPermission = service.getEntreprisePlanPermissionChad(formGroup) as any;

        expect(entreprisePlanPermission).toMatchObject({});
      });

      it('should return IEntreprisePlanPermissionChad', () => {
        const formGroup = service.createEntreprisePlanPermissionChadFormGroup(sampleWithRequiredData);

        const entreprisePlanPermission = service.getEntreprisePlanPermissionChad(formGroup) as any;

        expect(entreprisePlanPermission).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEntreprisePlanPermissionChad should not enable id FormControl', () => {
        const formGroup = service.createEntreprisePlanPermissionChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEntreprisePlanPermissionChad should disable id FormControl', () => {
        const formGroup = service.createEntreprisePlanPermissionChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
