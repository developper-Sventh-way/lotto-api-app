import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEntreprisePlanPermissionChad } from '../entreprise-plan-permission-chad.model';
import { EntreprisePlanPermissionChadService } from '../service/entreprise-plan-permission-chad.service';

import { EntreprisePlanPermissionChadRoutingResolveService } from './entreprise-plan-permission-chad-routing-resolve.service';

describe('EntreprisePlanPermissionChad routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EntreprisePlanPermissionChadRoutingResolveService;
  let service: EntreprisePlanPermissionChadService;
  let resultEntreprisePlanPermissionChad: IEntreprisePlanPermissionChad | null | undefined;

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
    routingResolveService = TestBed.inject(EntreprisePlanPermissionChadRoutingResolveService);
    service = TestBed.inject(EntreprisePlanPermissionChadService);
    resultEntreprisePlanPermissionChad = undefined;
  });

  describe('resolve', () => {
    it('should return IEntreprisePlanPermissionChad returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntreprisePlanPermissionChad = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEntreprisePlanPermissionChad).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntreprisePlanPermissionChad = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEntreprisePlanPermissionChad).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IEntreprisePlanPermissionChad>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEntreprisePlanPermissionChad = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEntreprisePlanPermissionChad).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
