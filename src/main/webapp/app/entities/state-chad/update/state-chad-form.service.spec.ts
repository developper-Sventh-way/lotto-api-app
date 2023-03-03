import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../state-chad.test-samples';

import { StateChadFormService } from './state-chad-form.service';

describe('StateChad Form Service', () => {
  let service: StateChadFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateChadFormService);
  });

  describe('Service methods', () => {
    describe('createStateChadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createStateChadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
          })
        );
      });

      it('passing IStateChad should create a new form with FormGroup', () => {
        const formGroup = service.createStateChadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
          })
        );
      });
    });

    describe('getStateChad', () => {
      it('should return NewStateChad for default StateChad initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createStateChadFormGroup(sampleWithNewData);

        const state = service.getStateChad(formGroup) as any;

        expect(state).toMatchObject(sampleWithNewData);
      });

      it('should return NewStateChad for empty StateChad initial value', () => {
        const formGroup = service.createStateChadFormGroup();

        const state = service.getStateChad(formGroup) as any;

        expect(state).toMatchObject({});
      });

      it('should return IStateChad', () => {
        const formGroup = service.createStateChadFormGroup(sampleWithRequiredData);

        const state = service.getStateChad(formGroup) as any;

        expect(state).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IStateChad should not enable id FormControl', () => {
        const formGroup = service.createStateChadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewStateChad should disable id FormControl', () => {
        const formGroup = service.createStateChadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
