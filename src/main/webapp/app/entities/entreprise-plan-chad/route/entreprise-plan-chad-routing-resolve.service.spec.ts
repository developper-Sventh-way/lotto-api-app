import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEntreprisePlanChad } from '../entreprise-plan-chad.model';
import { EntreprisePlanChadService } from '../service/entreprise-plan-chad.service';

import { EntreprisePlanChadRoutingResolveService } from './entreprise-plan-chad-routing-resolve.service';

describe('EntreprisePlanChad routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EntreprisePlanChadRoutingResolveService;
  let service: EntreprisePlanChadService;
  let resultEntreprisePlanChad: IEntreprisePlanChad | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(EntreprisePlanChadRoutingResolveService);
    service = TestBed.inject(EntreprisePlanChadService);
    resultEntreprisePlanChad = undefined;
  });

  describe('resolve', () => {
    it('should return IEntreprisePlanChad returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntreprisePlanChad = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEntreprisePlanChad).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntreprisePlanChad = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEntreprisePlanChad).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IEntreprisePlanChad>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntreprisePlanChad = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEntreprisePlanChad).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
