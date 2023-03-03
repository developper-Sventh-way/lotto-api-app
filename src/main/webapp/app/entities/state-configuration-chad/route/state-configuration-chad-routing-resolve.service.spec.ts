import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IStateConfigurationChad } from '../state-configuration-chad.model';
import { StateConfigurationChadService } from '../service/state-configuration-chad.service';

import { StateConfigurationChadRoutingResolveService } from './state-configuration-chad-routing-resolve.service';

describe('StateConfigurationChad routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: StateConfigurationChadRoutingResolveService;
  let service: StateConfigurationChadService;
  let resultStateConfigurationChad: IStateConfigurationChad | null | undefined;

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
    routingResolveService = TestBed.inject(StateConfigurationChadRoutingResolveService);
    service = TestBed.inject(StateConfigurationChadService);
    resultStateConfigurationChad = undefined;
  });

  describe('resolve', () => {
    it('should return IStateConfigurationChad returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStateConfigurationChad = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStateConfigurationChad).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStateConfigurationChad = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultStateConfigurationChad).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IStateConfigurationChad>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultStateConfigurationChad = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultStateConfigurationChad).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
