import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEntreprisePlanPermissionChad } from '../entreprise-plan-permission-chad.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../entreprise-plan-permission-chad.test-samples';

import { EntreprisePlanPermissionChadService } from './entreprise-plan-permission-chad.service';

const requireRestSample: IEntreprisePlanPermissionChad = {
  ...sampleWithRequiredData,
};

describe('EntreprisePlanPermissionChad Service', () => {
  let service: EntreprisePlanPermissionChadService;
  let httpMock: HttpTestingController;
  let expectedResult: IEntreprisePlanPermissionChad | IEntreprisePlanPermissionChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EntreprisePlanPermissionChadService);
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

    it('should create a EntreprisePlanPermissionChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const entreprisePlanPermission = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(entreprisePlanPermission).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EntreprisePlanPermissionChad', () => {
      const entreprisePlanPermission = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(entreprisePlanPermission).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EntreprisePlanPermissionChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EntreprisePlanPermissionChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EntreprisePlanPermissionChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEntreprisePlanPermissionChadToCollectionIfMissing', () => {
      it('should add a EntreprisePlanPermissionChad to an empty array', () => {
        const entreprisePlanPermission: IEntreprisePlanPermissionChad = sampleWithRequiredData;
        expectedResult = service.addEntreprisePlanPermissionChadToCollectionIfMissing([], entreprisePlanPermission);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entreprisePlanPermission);
      });

      it('should not add a EntreprisePlanPermissionChad to an array that contains it', () => {
        const entreprisePlanPermission: IEntreprisePlanPermissionChad = sampleWithRequiredData;
        const entreprisePlanPermissionCollection: IEntreprisePlanPermissionChad[] = [
          {
            ...entreprisePlanPermission,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEntreprisePlanPermissionChadToCollectionIfMissing(
          entreprisePlanPermissionCollection,
          entreprisePlanPermission
        );
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EntreprisePlanPermissionChad to an array that doesn't contain it", () => {
        const entreprisePlanPermission: IEntreprisePlanPermissionChad = sampleWithRequiredData;
        const entreprisePlanPermissionCollection: IEntreprisePlanPermissionChad[] = [sampleWithPartialData];
        expectedResult = service.addEntreprisePlanPermissionChadToCollectionIfMissing(
          entreprisePlanPermissionCollection,
          entreprisePlanPermission
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entreprisePlanPermission);
      });

      it('should add only unique EntreprisePlanPermissionChad to an array', () => {
        const entreprisePlanPermissionArray: IEntreprisePlanPermissionChad[] = [
          sampleWithRequiredData,
          sampleWithPartialData,
          sampleWithFullData,
        ];
        const entreprisePlanPermissionCollection: IEntreprisePlanPermissionChad[] = [sampleWithRequiredData];
        expectedResult = service.addEntreprisePlanPermissionChadToCollectionIfMissing(
          entreprisePlanPermissionCollection,
          ...entreprisePlanPermissionArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const entreprisePlanPermission: IEntreprisePlanPermissionChad = sampleWithRequiredData;
        const entreprisePlanPermission2: IEntreprisePlanPermissionChad = sampleWithPartialData;
        expectedResult = service.addEntreprisePlanPermissionChadToCollectionIfMissing(
          [],
          entreprisePlanPermission,
          entreprisePlanPermission2
        );
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(entreprisePlanPermission);
        expect(expectedResult).toContain(entreprisePlanPermission2);
      });

      it('should accept null and undefined values', () => {
        const entreprisePlanPermission: IEntreprisePlanPermissionChad = sampleWithRequiredData;
        expectedResult = service.addEntreprisePlanPermissionChadToCollectionIfMissing([], null, entreprisePlanPermission, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(entreprisePlanPermission);
      });

      it('should return initial array if no EntreprisePlanPermissionChad is added', () => {
        const entreprisePlanPermissionCollection: IEntreprisePlanPermissionChad[] = [sampleWithRequiredData];
        expectedResult = service.addEntreprisePlanPermissionChadToCollectionIfMissing(entreprisePlanPermissionCollection, undefined, null);
        expect(expectedResult).toEqual(entreprisePlanPermissionCollection);
      });
    });

    describe('compareEntreprisePlanPermissionChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEntreprisePlanPermissionChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEntreprisePlanPermissionChad(entity1, entity2);
        const compareResult2 = service.compareEntreprisePlanPermissionChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEntreprisePlanPermissionChad(entity1, entity2);
        const compareResult2 = service.compareEntreprisePlanPermissionChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEntreprisePlanPermissionChad(entity1, entity2);
        const compareResult2 = service.compareEntreprisePlanPermissionChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
