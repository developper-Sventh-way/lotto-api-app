import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IStateConfigurationChad } from '../state-configuration-chad.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../state-configuration-chad.test-samples';

import { StateConfigurationChadService } from './state-configuration-chad.service';

const requireRestSample: IStateConfigurationChad = {
  ...sampleWithRequiredData,
};

describe('StateConfigurationChad Service', () => {
  let service: StateConfigurationChadService;
  let httpMock: HttpTestingController;
  let expectedResult: IStateConfigurationChad | IStateConfigurationChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(StateConfigurationChadService);
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

    it('should create a StateConfigurationChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const stateConfiguration = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(stateConfiguration).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a StateConfigurationChad', () => {
      const stateConfiguration = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(stateConfiguration).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a StateConfigurationChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of StateConfigurationChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a StateConfigurationChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addStateConfigurationChadToCollectionIfMissing', () => {
      it('should add a StateConfigurationChad to an empty array', () => {
        const stateConfiguration: IStateConfigurationChad = sampleWithRequiredData;
        expectedResult = service.addStateConfigurationChadToCollectionIfMissing([], stateConfiguration);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(stateConfiguration);
      });

      it('should not add a StateConfigurationChad to an array that contains it', () => {
        const stateConfiguration: IStateConfigurationChad = sampleWithRequiredData;
        const stateConfigurationCollection: IStateConfigurationChad[] = [
          {
            ...stateConfiguration,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addStateConfigurationChadToCollectionIfMissing(stateConfigurationCollection, stateConfiguration);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a StateConfigurationChad to an array that doesn't contain it", () => {
        const stateConfiguration: IStateConfigurationChad = sampleWithRequiredData;
        const stateConfigurationCollection: IStateConfigurationChad[] = [sampleWithPartialData];
        expectedResult = service.addStateConfigurationChadToCollectionIfMissing(stateConfigurationCollection, stateConfiguration);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(stateConfiguration);
      });

      it('should add only unique StateConfigurationChad to an array', () => {
        const stateConfigurationArray: IStateConfigurationChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const stateConfigurationCollection: IStateConfigurationChad[] = [sampleWithRequiredData];
        expectedResult = service.addStateConfigurationChadToCollectionIfMissing(stateConfigurationCollection, ...stateConfigurationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const stateConfiguration: IStateConfigurationChad = sampleWithRequiredData;
        const stateConfiguration2: IStateConfigurationChad = sampleWithPartialData;
        expectedResult = service.addStateConfigurationChadToCollectionIfMissing([], stateConfiguration, stateConfiguration2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(stateConfiguration);
        expect(expectedResult).toContain(stateConfiguration2);
      });

      it('should accept null and undefined values', () => {
        const stateConfiguration: IStateConfigurationChad = sampleWithRequiredData;
        expectedResult = service.addStateConfigurationChadToCollectionIfMissing([], null, stateConfiguration, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(stateConfiguration);
      });

      it('should return initial array if no StateConfigurationChad is added', () => {
        const stateConfigurationCollection: IStateConfigurationChad[] = [sampleWithRequiredData];
        expectedResult = service.addStateConfigurationChadToCollectionIfMissing(stateConfigurationCollection, undefined, null);
        expect(expectedResult).toEqual(stateConfigurationCollection);
      });
    });

    describe('compareStateConfigurationChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareStateConfigurationChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareStateConfigurationChad(entity1, entity2);
        const compareResult2 = service.compareStateConfigurationChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareStateConfigurationChad(entity1, entity2);
        const compareResult2 = service.compareStateConfigurationChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareStateConfigurationChad(entity1, entity2);
        const compareResult2 = service.compareStateConfigurationChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
