import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EntreprisePlanPermissionChadFormService } from './entreprise-plan-permission-chad-form.service';
import { EntreprisePlanPermissionChadService } from '../service/entreprise-plan-permission-chad.service';
import { IEntreprisePlanPermissionChad } from '../entreprise-plan-permission-chad.model';
import { IEntreprisePlanChad } from 'app/entities/entreprise-plan-chad/entreprise-plan-chad.model';
import { EntreprisePlanChadService } from 'app/entities/entreprise-plan-chad/service/entreprise-plan-chad.service';
import { IStateChad } from 'app/entities/state-chad/state-chad.model';
import { StateChadService } from 'app/entities/state-chad/service/state-chad.service';

import { EntreprisePlanPermissionChadUpdateComponent } from './entreprise-plan-permission-chad-update.component';

describe('EntreprisePlanPermissionChad Management Update Component', () => {
  let comp: EntreprisePlanPermissionChadUpdateComponent;
  let fixture: ComponentFixture<EntreprisePlanPermissionChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let entreprisePlanPermissionFormService: EntreprisePlanPermissionChadFormService;
  let entreprisePlanPermissionService: EntreprisePlanPermissionChadService;
  let entreprisePlanService: EntreprisePlanChadService;
  let stateService: StateChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EntreprisePlanPermissionChadUpdateComponent],
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
      .overrideTemplate(EntreprisePlanPermissionChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntreprisePlanPermissionChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    entreprisePlanPermissionFormService = TestBed.inject(EntreprisePlanPermissionChadFormService);
    entreprisePlanPermissionService = TestBed.inject(EntreprisePlanPermissionChadService);
    entreprisePlanService = TestBed.inject(EntreprisePlanChadService);
    stateService = TestBed.inject(StateChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call EntreprisePlanChad query and add missing value', () => {
      const entreprisePlanPermission: IEntreprisePlanPermissionChad = { id: 456 };
      const entreprisePlan: IEntreprisePlanChad = { id: 26053 };
      entreprisePlanPermission.entreprisePlan = entreprisePlan;

      const entreprisePlanCollection: IEntreprisePlanChad[] = [{ id: 81699 }];
      jest.spyOn(entreprisePlanService, 'query').mockReturnValue(of(new HttpResponse({ body: entreprisePlanCollection })));
      const additionalEntreprisePlanChads = [entreprisePlan];
      const expectedCollection: IEntreprisePlanChad[] = [...additionalEntreprisePlanChads, ...entreprisePlanCollection];
      jest.spyOn(entreprisePlanService, 'addEntreprisePlanChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ entreprisePlanPermission });
      comp.ngOnInit();

      expect(entreprisePlanService.query).toHaveBeenCalled();
      expect(entreprisePlanService.addEntreprisePlanChadToCollectionIfMissing).toHaveBeenCalledWith(
        entreprisePlanCollection,
        ...additionalEntreprisePlanChads.map(expect.objectContaining)
      );
      expect(comp.entreprisePlansSharedCollection).toEqual(expectedCollection);
    });

    it('Should call StateChad query and add missing value', () => {
      const entreprisePlanPermission: IEntreprisePlanPermissionChad = { id: 456 };
      const state: IStateChad = { id: 59977 };
      entreprisePlanPermission.state = state;

      const stateCollection: IStateChad[] = [{ id: 87822 }];
      jest.spyOn(stateService, 'query').mockReturnValue(of(new HttpResponse({ body: stateCollection })));
      const additionalStateChads = [state];
      const expectedCollection: IStateChad[] = [...additionalStateChads, ...stateCollection];
      jest.spyOn(stateService, 'addStateChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ entreprisePlanPermission });
      comp.ngOnInit();

      expect(stateService.query).toHaveBeenCalled();
      expect(stateService.addStateChadToCollectionIfMissing).toHaveBeenCalledWith(
        stateCollection,
        ...additionalStateChads.map(expect.objectContaining)
      );
      expect(comp.statesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const entreprisePlanPermission: IEntreprisePlanPermissionChad = { id: 456 };
      const entreprisePlan: IEntreprisePlanChad = { id: 29905 };
      entreprisePlanPermission.entreprisePlan = entreprisePlan;
      const state: IStateChad = { id: 13492 };
      entreprisePlanPermission.state = state;

      activatedRoute.data = of({ entreprisePlanPermission });
      comp.ngOnInit();

      expect(comp.entreprisePlansSharedCollection).toContain(entreprisePlan);
      expect(comp.statesSharedCollection).toContain(state);
      expect(comp.entreprisePlanPermission).toEqual(entreprisePlanPermission);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntreprisePlanPermissionChad>>();
      const entreprisePlanPermission = { id: 123 };
      jest.spyOn(entreprisePlanPermissionFormService, 'getEntreprisePlanPermissionChad').mockReturnValue(entreprisePlanPermission);
      jest.spyOn(entreprisePlanPermissionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entreprisePlanPermission });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entreprisePlanPermission }));
      saveSubject.complete();

      // THEN
      expect(entreprisePlanPermissionFormService.getEntreprisePlanPermissionChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(entreprisePlanPermissionService.update).toHaveBeenCalledWith(expect.objectContaining(entreprisePlanPermission));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntreprisePlanPermissionChad>>();
      const entreprisePlanPermission = { id: 123 };
      jest.spyOn(entreprisePlanPermissionFormService, 'getEntreprisePlanPermissionChad').mockReturnValue({ id: null });
      jest.spyOn(entreprisePlanPermissionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entreprisePlanPermission: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entreprisePlanPermission }));
      saveSubject.complete();

      // THEN
      expect(entreprisePlanPermissionFormService.getEntreprisePlanPermissionChad).toHaveBeenCalled();
      expect(entreprisePlanPermissionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntreprisePlanPermissionChad>>();
      const entreprisePlanPermission = { id: 123 };
      jest.spyOn(entreprisePlanPermissionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entreprisePlanPermission });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(entreprisePlanPermissionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEntreprisePlanChad', () => {
      it('Should forward to entreprisePlanService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(entreprisePlanService, 'compareEntreprisePlanChad');
        comp.compareEntreprisePlanChad(entity, entity2);
        expect(entreprisePlanService.compareEntreprisePlanChad).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
