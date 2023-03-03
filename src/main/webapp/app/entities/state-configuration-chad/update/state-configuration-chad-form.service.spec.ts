import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../state-configuration-chad.test-samples';

import { StateConfigurationChadFormService } from './state-configuration-chad-form.service';

describe('StateConfigurationChad Form Service', () => {
  let service: StateConfigurationChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateConfigurationChadFormService);
  });

  describe('Service methods', () => {
    describe('createStateConfigurationChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStateConfigurationChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startHour: expect.any(Object),
            endHour: expect.any(Object),
            statut: expect.any(Object),
            state: expect.any(Object),
          })
        );
      });

      it('passing IStateConfigurationChad should create a new form with FormGroup', () => {
        const formGroup = service.createStateConfigurationChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            startHour: expect.any(Object),
            endHour: expect.any(Object),
            statut: expect.any(Object),
            state: expect.any(Object),
          })
        );
      });
    });

    describe('getStateConfigurationChad', () => {
      it('should return NewStateConfigurationChad for default StateConfigurationChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createStateConfigurationChadFormGroup(sampleWithNewData);

        const stateConfiguration = service.getStateConfigurationChad(formGroup) as any;

        expect(stateConfiguration).toMatchObject(sampleWithNewData);
      });

      it('should return NewStateConfigurationChad for empty StateConfigurationChad initial value', () => {
        const formGroup = service.createStateConfigurationChadFormGroup();

        const stateConfiguration = service.getStateConfigurationChad(formGroup) as any;

        expect(stateConfiguration).toMatchObject({});
      });

      it('should return IStateConfigurationChad', () => {
        const formGroup = service.createStateConfigurationChadFormGroup(sampleWithRequiredData);

        const stateConfiguration = service.getStateConfigurationChad(formGroup) as any;

        expect(stateConfiguration).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStateConfigurationChad should not enable id FormControl', () => {
        const formGroup = service.createStateConfigurationChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStateConfigurationChad should disable id FormControl', () => {
        const formGroup = service.createStateConfigurationChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
