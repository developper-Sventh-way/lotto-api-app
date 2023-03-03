import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IStateChad } from '../state-chad.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../state-chad.test-samples';

import { StateChadService } from './state-chad.service';

const requireRestSample: IStateChad = {
  ...sampleWithRequiredData,
};

describe('StateChad Service', () => {
  let service: StateChadService;
  let httpMock: HttpTestingController;
  let expectedResult: IStateChad | IStateChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StateChadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a StateChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const state = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(state).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StateChad', () => {
      const state = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(state).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a StateChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StateChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a StateChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addStateChadToCollectionIfMissing', () => {
      it('should add a StateChad to an empty array', () => {
        const state: IStateChad = sampleWithRequiredData;
        expectedResult = service.addStateChadToCollectionIfMissing([], state);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(state);
      });

      it('should not add a StateChad to an array that contains it', () => {
        const state: IStateChad = sampleWithRequiredData;
        const stateCollection: IStateChad[] = [
          {
            ...state,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addStateChadToCollectionIfMissing(stateCollection, state);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StateChad to an array that doesn't contain it", () => {
        const state: IStateChad = sampleWithRequiredData;
        const stateCollection: IStateChad[] = [sampleWithPartialData];
        expectedResult = service.addStateChadToCollectionIfMissing(stateCollection, state);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(state);
      });

      it('should add only unique StateChad to an array', () => {
        const stateArray: IStateChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const stateCollection: IStateChad[] = [sampleWithRequiredData];
        expectedResult = service.addStateChadToCollectionIfMissing(stateCollection, ...stateArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const state: IStateChad = sampleWithRequiredData;
        const state2: IStateChad = sampleWithPartialData;
        expectedResult = service.addStateChadToCollectionIfMissing([], state, state2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(state);
        expect(expectedResult).toContain(state2);
      });

      it('should accept null and undefined values', () => {
        const state: IStateChad = sampleWithRequiredData;
        expectedResult = service.addStateChadToCollectionIfMissing([], null, state, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(state);
      });

      it('should return initial array if no StateChad is added', () => {
        const stateCollection: IStateChad[] = [sampleWithRequiredData];
        expectedResult = service.addStateChadToCollectionIfMissing(stateCollection, undefined, null);
        expect(expectedResult).toEqual(stateCollection);
      });
    });

    describe('compareStateChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareStateChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareStateChad(entity1, entity2);
        const compareResult2 = service.compareStateChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareStateChad(entity1, entity2);
        const compareResult2 = service.compareStateChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareStateChad(entity1, entity2);
        const compareResult2 = service.compareStateChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
