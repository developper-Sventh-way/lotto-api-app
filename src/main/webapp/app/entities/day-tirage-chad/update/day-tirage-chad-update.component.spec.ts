import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DayTirageChadFormService } from './day-tirage-chad-form.service';
import { DayTirageChadService } from '../service/day-tirage-chad.service';
import { IDayTirageChad } from '../day-tirage-chad.model';
import { IStateChad } from 'app/entities/state-chad/state-chad.model';
import { StateChadService } from 'app/entities/state-chad/service/state-chad.service';

import { DayTirageChadUpdateComponent } from './day-tirage-chad-update.component';

describe('DayTirageChad Management Update Component', () => {
  let comp: DayTirageChadUpdateComponent;
  let fixture: ComponentFixture<DayTirageChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dayTirageFormService: DayTirageChadFormService;
  let dayTirageService: DayTirageChadService;
  let stateService: StateChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DayTirageChadUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(DayTirageChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DayTirageChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dayTirageFormService = TestBed.inject(DayTirageChadFormService);
    dayTirageService = TestBed.inject(DayTirageChadService);
    stateService = TestBed.inject(StateChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call StateChad query and add missing value', () => {
      const dayTirage: IDayTirageChad = { id: 456 };
      const state: IStateChad = { id: 65104 };
      dayTirage.state = state;

      const stateCollection: IStateChad[] = [{ id: 95419 }];
      jest.spyOn(stateService, 'query').mockReturnValue(of(new HttpResponse({ body: stateCollection })));
      const additionalStateChads = [state];
      const expectedCollection: IStateChad[] = [...additionalStateChads, ...stateCollection];
      jest.spyOn(stateService, 'addStateChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dayTirage });
      comp.ngOnInit();

      expect(stateService.query).toHaveBeenCalled();
      expect(stateService.addStateChadToCollectionIfMissing).toHaveBeenCalledWith(
        stateCollection,
        ...additionalStateChads.map(expect.objectContaining)
      );
      expect(comp.statesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const dayTirage: IDayTirageChad = { id: 456 };
      const state: IStateChad = { id: 31210 };
      dayTirage.state = state;

      activatedRoute.data = of({ dayTirage });
      comp.ngOnInit();

      expect(comp.statesSharedCollection).toContain(state);
      expect(comp.dayTirage).toEqual(dayTirage);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDayTirageChad>>();
      const dayTirage = { id: 123 };
      jest.spyOn(dayTirageFormService, 'getDayTirageChad').mockReturnValue(dayTirage);
      jest.spyOn(dayTirageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dayTirage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dayTirage }));
      saveSubject.complete();

      // THEN
      expect(dayTirageFormService.getDayTirageChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(dayTirageService.update).toHaveBeenCalledWith(expect.objectContaining(dayTirage));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDayTirageChad>>();
      const dayTirage = { id: 123 };
      jest.spyOn(dayTirageFormService, 'getDayTirageChad').mockReturnValue({ id: null });
      jest.spyOn(dayTirageService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dayTirage: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dayTirage }));
      saveSubject.complete();

      // THEN
      expect(dayTirageFormService.getDayTirageChad).toHaveBeenCalled();
      expect(dayTirageService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDayTirageChad>>();
      const dayTirage = { id: 123 };
      jest.spyOn(dayTirageService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dayTirage });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dayTirageService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareStateChad', () => {
      it('Should forward to stateService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(stateService, 'compareStateChad');
        comp.compareStateChad(entity, entity2);
        expect(stateService.compareStateChad).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
