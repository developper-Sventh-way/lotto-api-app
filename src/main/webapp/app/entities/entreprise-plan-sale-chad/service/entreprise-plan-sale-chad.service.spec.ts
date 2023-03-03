import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEntreprisePlanSaleChad } from '../entreprise-plan-sale-chad.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../entreprise-plan-sale-chad.test-samples';

import { EntreprisePlanSaleChadService, RestEntreprisePlanSaleChad } from './entreprise-plan-sale-chad.service';

const requireRestSample: RestEntreprisePlanSaleChad = {
  ...sampleWithRequiredData,
  startDate: sampleWithRequiredData.startDate?.toJSON(),
  expirateDate: sampleWithRequiredData.expirateDate?.toJSON(),
};

describe('EntreprisePlanSaleChad Service', () => {
  let service: EntreprisePlanSaleChadService;
  let httpMock: HttpTestingController;
  let expectedResult: IEntreprisePlanSaleChad | IEntreprisePlanSaleChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EntreprisePlanSaleChadService);
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

    it('should create a EntreprisePlanSaleChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const entreprisePlanSale = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(entreprisePlanSale).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EntreprisePlanSaleChad', () => {
      const entreprisePlanSale = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(entreprisePlanSale).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EntreprisePlanSaleChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EntreprisePlanSaleChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EntreprisePlanSaleChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEntreprisePlanSaleChadToCollectionIfMissing', () => {
      it('should add a EntreprisePlanSaleChad to an empty array', () => {
        const entreprisePlanSale: IEntreprisePlanSaleChad = sampleWithRequiredData;
        expectedResult = service.addEntreprisePlanSaleChadToCollectionIfMissing([], entreprisePlanSale);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entreprisePlanSale);
      });

      it('should not add a EntreprisePlanSaleChad to an array that contains it', () => {
        const entreprisePlanSale: IEntreprisePlanSaleChad = sampleWithRequiredData;
        const entreprisePlanSaleCollection: IEntreprisePlanSaleChad[] = [
          {
            ...entreprisePlanSale,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEntreprisePlanSaleChadToCollectionIfMissing(entreprisePlanSaleCollection, entreprisePlanSale);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EntreprisePlanSaleChad to an array that doesn't contain it", () => {
        const entreprisePlanSale: IEntreprisePlanSaleChad = sampleWithRequiredData;
        const entreprisePlanSaleCollection: IEntreprisePlanSaleChad[] = [sampleWithPartialData];
        expectedResult = service.addEntreprisePlanSaleChadToCollectionIfMissing(entreprisePlanSaleCollection, entreprisePlanSale);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entreprisePlanSale);
      });

      it('should add only unique EntreprisePlanSaleChad to an array', () => {
        const entreprisePlanSaleArray: IEntreprisePlanSaleChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const entreprisePlanSaleCollection: IEntreprisePlanSaleChad[] = [sampleWithRequiredData];
        expectedResult = service.addEntreprisePlanSaleChadToCollectionIfMissing(entreprisePlanSaleCollection, ...entreprisePlanSaleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const entreprisePlanSale: IEntreprisePlanSaleChad = sampleWithRequiredData;
        const entreprisePlanSale2: IEntreprisePlanSaleChad = sampleWithPartialData;
        expectedResult = service.addEntreprisePlanSaleChadToCollectionIfMissing([], entreprisePlanSale, entreprisePlanSale2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entreprisePlanSale);
        expect(expectedResult).toContain(entreprisePlanSale2);
      });

      it('should accept null and undefined values', () => {
        const entreprisePlanSale: IEntreprisePlanSaleChad = sampleWithRequiredData;
        expectedResult = service.addEntreprisePlanSaleChadToCollectionIfMissing([], null, entreprisePlanSale, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entreprisePlanSale);
      });

      it('should return initial array if no EntreprisePlanSaleChad is added', () => {
        const entreprisePlanSaleCollection: IEntreprisePlanSaleChad[] = [sampleWithRequiredData];
        expectedResult = service.addEntreprisePlanSaleChadToCollectionIfMissing(entreprisePlanSaleCollection, undefined, null);
        expect(expectedResult).toEqual(entreprisePlanSaleCollection);
      });
    });

    describe('compareEntreprisePlanSaleChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEntreprisePlanSaleChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEntreprisePlanSaleChad(entity1, entity2);
        const compareResult2 = service.compareEntreprisePlanSaleChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEntreprisePlanSaleChad(entity1, entity2);
        const compareResult2 = service.compareEntreprisePlanSaleChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEntreprisePlanSaleChad(entity1, entity2);
        const compareResult2 = service.compareEntreprisePlanSaleChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
