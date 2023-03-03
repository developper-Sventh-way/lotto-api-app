import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DayTirageChadService } from '../service/day-tirage-chad.service';

import { DayTirageChadComponent } from './day-tirage-chad.component';
import SpyInstance = jest.SpyInstance;

describe('DayTirageChad Management Component', () => {
  let comp: DayTirageChadComponent;
  let fixture: ComponentFixture<DayTirageChadComponent>;
  let service: DayTirageChadService;
  let routerNavigateSpy: SpyInstance<Promise<boolean>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'day-tirage-chad', component: DayTirageChadComponent }]), HttpClientTestingModule],
      declarations: [DayTirageChadComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(DayTirageChadComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DayTirageChadComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DayTirageChadService);
    routerNavigateSpy = jest.spyOn(comp.router, 'navigate');

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.dayTirages?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to dayTirageService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getDayTirageChadIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDayTirageChadIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });

  it('should load a page', () => {
    // WHEN
    comp.navigateToPage(1);

    // THEN
    expect(routerNavigateSpy).toHaveBeenCalled();
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['id,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.navigateToWithComponentValues();

    // THEN
    expect(routerNavigateSpy).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({
        queryParams: expect.objectContaining({
          sort: ['name,asc'],
        }),
      })
    );
  });
});
