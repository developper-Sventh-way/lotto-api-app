import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRequestTransactionChad } from '../request-transaction-chad.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../request-transaction-chad.test-samples';

import { RequestTransactionChadService, RestRequestTransactionChad } from './request-transaction-chad.service';

const requireRestSample: RestRequestTransactionChad = {
  ...sampleWithRequiredData,
  dateTransaction: sampleWithRequiredData.dateTransaction?.toJSON(),
};

describe('RequestTransactionChad Service', () => {
  let service: RequestTransactionChadService;
  let httpMock: HttpTestingController;
  let expectedResult: IRequestTransactionChad | IRequestTransactionChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RequestTransactionChadService);
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

    it('should create a RequestTransactionChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const requestTransaction = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(requestTransaction).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RequestTransactionChad', () => {
      const requestTransaction = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(requestTransaction).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RequestTransactionChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RequestTransactionChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a RequestTransactionChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRequestTransactionChadToCollectionIfMissing', () => {
      it('should add a RequestTransactionChad to an empty array', () => {
        const requestTransaction: IRequestTransactionChad = sampleWithRequiredData;
        expectedResult = service.addRequestTransactionChadToCollectionIfMissing([], requestTransaction);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(requestTransaction);
      });

      it('should not add a RequestTransactionChad to an array that contains it', () => {
        const requestTransaction: IRequestTransactionChad = sampleWithRequiredData;
        const requestTransactionCollection: IRequestTransactionChad[] = [
          {
            ...requestTransaction,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRequestTransactionChadToCollectionIfMissing(requestTransactionCollection, requestTransaction);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RequestTransactionChad to an array that doesn't contain it", () => {
        const requestTransaction: IRequestTransactionChad = sampleWithRequiredData;
        const requestTransactionCollection: IRequestTransactionChad[] = [sampleWithPartialData];
        expectedResult = service.addRequestTransactionChadToCollectionIfMissing(requestTransactionCollection, requestTransaction);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(requestTransaction);
      });

      it('should add only unique RequestTransactionChad to an array', () => {
        const requestTransactionArray: IRequestTransactionChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const requestTransactionCollection: IRequestTransactionChad[] = [sampleWithRequiredData];
        expectedResult = service.addRequestTransactionChadToCollectionIfMissing(requestTransactionCollection, ...requestTransactionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const requestTransaction: IRequestTransactionChad = sampleWithRequiredData;
        const requestTransaction2: IRequestTransactionChad = sampleWithPartialData;
        expectedResult = service.addRequestTransactionChadToCollectionIfMissing([], requestTransaction, requestTransaction2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(requestTransaction);
        expect(expectedResult).toContain(requestTransaction2);
      });

      it('should accept null and undefined values', () => {
        const requestTransaction: IRequestTransactionChad = sampleWithRequiredData;
        expectedResult = service.addRequestTransactionChadToCollectionIfMissing([], null, requestTransaction, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(requestTransaction);
      });

      it('should return initial array if no RequestTransactionChad is added', () => {
        const requestTransactionCollection: IRequestTransactionChad[] = [sampleWithRequiredData];
        expectedResult = service.addRequestTransactionChadToCollectionIfMissing(requestTransactionCollection, undefined, null);
        expect(expectedResult).toEqual(requestTransactionCollection);
      });
    });

    describe('compareRequestTransactionChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRequestTransactionChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRequestTransactionChad(entity1, entity2);
        const compareResult2 = service.compareRequestTransactionChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRequestTransactionChad(entity1, entity2);
        const compareResult2 = service.compareRequestTransactionChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRequestTransactionChad(entity1, entity2);
        const compareResult2 = service.compareRequestTransactionChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
