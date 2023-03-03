import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { StateChadFormService } from './state-chad-form.service';
import { StateChadService } from '../service/state-chad.service';
import { IStateChad } from '../state-chad.model';

import { StateChadUpdateComponent } from './state-chad-update.component';

describe('StateChad Management Update Component', () => {
  let comp: StateChadUpdateComponent;
  let fixture: ComponentFixture<StateChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let stateFormService: StateChadFormService;
  let stateService: StateChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [StateChadUpdateComponent],
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
      .overrideTemplate(StateChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StateChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    stateFormService = TestBed.inject(StateChadFormService);
    stateService = TestBed.inject(StateChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const state: IStateChad = { id: 456 };

      activatedRoute.data = of({ state });
      comp.ngOnInit();

      expect(comp.state).toEqual(state);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStateChad>>();
      const state = { id: 123 };
      jest.spyOn(stateFormService, 'getStateChad').mockReturnValue(state);
      jest.spyOn(stateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ state });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: state }));
      saveSubject.complete();

      // THEN
      expect(stateFormService.getStateChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(stateService.update).toHaveBeenCalledWith(expect.objectContaining(state));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStateChad>>();
      const state = { id: 123 };
      jest.spyOn(stateFormService, 'getStateChad').mockReturnValue({ id: null });
      jest.spyOn(stateService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ state: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: state }));
      saveSubject.complete();

      // THEN
      expect(stateFormService.getStateChad).toHaveBeenCalled();
      expect(stateService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStateChad>>();
      const state = { id: 123 };
      jest.spyOn(stateService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ state });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(stateService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
