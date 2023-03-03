import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEntreprisePlanSaleChad } from '../entreprise-plan-sale-chad.model';
import { EntreprisePlanSaleChadService } from '../service/entreprise-plan-sale-chad.service';

import { EntreprisePlanSaleChadRoutingResolveService } from './entreprise-plan-sale-chad-routing-resolve.service';

describe('EntreprisePlanSaleChad routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EntreprisePlanSaleChadRoutingResolveService;
  let service: EntreprisePlanSaleChadService;
  let resultEntreprisePlanSaleChad: IEntreprisePlanSaleChad | null | undefined;

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
    routingResolveService = TestBed.inject(EntreprisePlanSaleChadRoutingResolveService);
    service = TestBed.inject(EntreprisePlanSaleChadService);
    resultEntreprisePlanSaleChad = undefined;
  });

  describe('resolve', () => {
    it('should return IEntreprisePlanSaleChad returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntreprisePlanSaleChad = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEntreprisePlanSaleChad).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntreprisePlanSaleChad = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEntreprisePlanSaleChad).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IEntreprisePlanSaleChad>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntreprisePlanSaleChad = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEntreprisePlanSaleChad).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
