import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEntreprisePlanChad } from '../entreprise-plan-chad.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../entreprise-plan-chad.test-samples';

import { EntreprisePlanChadService } from './entreprise-plan-chad.service';

const requireRestSample: IEntreprisePlanChad = {
  ...sampleWithRequiredData,
};

describe('EntreprisePlanChad Service', () => {
  let service: EntreprisePlanChadService;
  let httpMock: HttpTestingController;
  let expectedResult: IEntreprisePlanChad | IEntreprisePlanChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EntreprisePlanChadService);
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

    it('should create a EntreprisePlanChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const entreprisePlan = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(entreprisePlan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EntreprisePlanChad', () => {
      const entreprisePlan = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(entreprisePlan).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EntreprisePlanChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EntreprisePlanChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EntreprisePlanChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEntreprisePlanChadToCollectionIfMissing', () => {
      it('should add a EntreprisePlanChad to an empty array', () => {
        const entreprisePlan: IEntreprisePlanChad = sampleWithRequiredData;
        expectedResult = service.addEntreprisePlanChadToCollectionIfMissing([], entreprisePlan);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entreprisePlan);
      });

      it('should not add a EntreprisePlanChad to an array that contains it', () => {
        const entreprisePlan: IEntreprisePlanChad = sampleWithRequiredData;
        const entreprisePlanCollection: IEntreprisePlanChad[] = [
          {
            ...entreprisePlan,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEntreprisePlanChadToCollectionIfMissing(entreprisePlanCollection, entreprisePlan);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EntreprisePlanChad to an array that doesn't contain it", () => {
        const entreprisePlan: IEntreprisePlanChad = sampleWithRequiredData;
        const entreprisePlanCollection: IEntreprisePlanChad[] = [sampleWithPartialData];
        expectedResult = service.addEntreprisePlanChadToCollectionIfMissing(entreprisePlanCollection, entreprisePlan);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entreprisePlan);
      });

      it('should add only unique EntreprisePlanChad to an array', () => {
        const entreprisePlanArray: IEntreprisePlanChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const entreprisePlanCollection: IEntreprisePlanChad[] = [sampleWithRequiredData];
        expectedResult = service.addEntreprisePlanChadToCollectionIfMissing(entreprisePlanCollection, ...entreprisePlanArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const entreprisePlan: IEntreprisePlanChad = sampleWithRequiredData;
        const entreprisePlan2: IEntreprisePlanChad = sampleWithPartialData;
        expectedResult = service.addEntreprisePlanChadToCollectionIfMissing([], entreprisePlan, entreprisePlan2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entreprisePlan);
        expect(expectedResult).toContain(entreprisePlan2);
      });

      it('should accept null and undefined values', () => {
        const entreprisePlan: IEntreprisePlanChad = sampleWithRequiredData;
        expectedResult = service.addEntreprisePlanChadToCollectionIfMissing([], null, entreprisePlan, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entreprisePlan);
      });

      it('should return initial array if no EntreprisePlanChad is added', () => {
        const entreprisePlanCollection: IEntreprisePlanChad[] = [sampleWithRequiredData];
        expectedResult = service.addEntreprisePlanChadToCollectionIfMissing(entreprisePlanCollection, undefined, null);
        expect(expectedResult).toEqual(entreprisePlanCollection);
      });
    });

    describe('compareEntreprisePlanChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEntreprisePlanChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEntreprisePlanChad(entity1, entity2);
        const compareResult2 = service.compareEntreprisePlanChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEntreprisePlanChad(entity1, entity2);
        const compareResult2 = service.compareEntreprisePlanChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEntreprisePlanChad(entity1, entity2);
        const compareResult2 = service.compareEntreprisePlanChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
