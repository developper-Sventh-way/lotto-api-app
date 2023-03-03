import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDayTirageChad } from '../day-tirage-chad.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../day-tirage-chad.test-samples';

import { DayTirageChadService, RestDayTirageChad } from './day-tirage-chad.service';

const requireRestSample: RestDayTirageChad = {
  ...sampleWithRequiredData,
  dateTransaction: sampleWithRequiredData.dateTransaction?.toJSON(),
};

describe('DayTirageChad Service', () => {
  let service: DayTirageChadService;
  let httpMock: HttpTestingController;
  let expectedResult: IDayTirageChad | IDayTirageChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DayTirageChadService);
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

    it('should create a DayTirageChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dayTirage = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(dayTirage).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DayTirageChad', () => {
      const dayTirage = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(dayTirage).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DayTirageChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DayTirageChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a DayTirageChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDayTirageChadToCollectionIfMissing', () => {
      it('should add a DayTirageChad to an empty array', () => {
        const dayTirage: IDayTirageChad = sampleWithRequiredData;
        expectedResult = service.addDayTirageChadToCollectionIfMissing([], dayTirage);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dayTirage);
      });

      it('should not add a DayTirageChad to an array that contains it', () => {
        const dayTirage: IDayTirageChad = sampleWithRequiredData;
        const dayTirageCollection: IDayTirageChad[] = [
          {
            ...dayTirage,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDayTirageChadToCollectionIfMissing(dayTirageCollection, dayTirage);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DayTirageChad to an array that doesn't contain it", () => {
        const dayTirage: IDayTirageChad = sampleWithRequiredData;
        const dayTirageCollection: IDayTirageChad[] = [sampleWithPartialData];
        expectedResult = service.addDayTirageChadToCollectionIfMissing(dayTirageCollection, dayTirage);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dayTirage);
      });

      it('should add only unique DayTirageChad to an array', () => {
        const dayTirageArray: IDayTirageChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const dayTirageCollection: IDayTirageChad[] = [sampleWithRequiredData];
        expectedResult = service.addDayTirageChadToCollectionIfMissing(dayTirageCollection, ...dayTirageArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const dayTirage: IDayTirageChad = sampleWithRequiredData;
        const dayTirage2: IDayTirageChad = sampleWithPartialData;
        expectedResult = service.addDayTirageChadToCollectionIfMissing([], dayTirage, dayTirage2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(dayTirage);
        expect(expectedResult).toContain(dayTirage2);
      });

      it('should accept null and undefined values', () => {
        const dayTirage: IDayTirageChad = sampleWithRequiredData;
        expectedResult = service.addDayTirageChadToCollectionIfMissing([], null, dayTirage, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(dayTirage);
      });

      it('should return initial array if no DayTirageChad is added', () => {
        const dayTirageCollection: IDayTirageChad[] = [sampleWithRequiredData];
        expectedResult = service.addDayTirageChadToCollectionIfMissing(dayTirageCollection, undefined, null);
        expect(expectedResult).toEqual(dayTirageCollection);
      });
    });

    describe('compareDayTirageChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDayTirageChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareDayTirageChad(entity1, entity2);
        const compareResult2 = service.compareDayTirageChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareDayTirageChad(entity1, entity2);
        const compareResult2 = service.compareDayTirageChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareDayTirageChad(entity1, entity2);
        const compareResult2 = service.compareDayTirageChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
