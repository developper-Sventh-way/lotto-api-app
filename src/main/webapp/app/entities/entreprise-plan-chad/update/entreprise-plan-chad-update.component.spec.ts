import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EntreprisePlanChadFormService } from './entreprise-plan-chad-form.service';
import { EntreprisePlanChadService } from '../service/entreprise-plan-chad.service';
import { IEntreprisePlanChad } from '../entreprise-plan-chad.model';

import { EntreprisePlanChadUpdateComponent } from './entreprise-plan-chad-update.component';

describe('EntreprisePlanChad Management Update Component', () => {
  let comp: EntreprisePlanChadUpdateComponent;
  let fixture: ComponentFixture<EntreprisePlanChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let entreprisePlanFormService: EntreprisePlanChadFormService;
  let entreprisePlanService: EntreprisePlanChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EntreprisePlanChadUpdateComponent],
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
      .overrideTemplate(EntreprisePlanChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntreprisePlanChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    entreprisePlanFormService = TestBed.inject(EntreprisePlanChadFormService);
    entreprisePlanService = TestBed.inject(EntreprisePlanChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const entreprisePlan: IEntreprisePlanChad = { id: 456 };

      activatedRoute.data = of({ entreprisePlan });
      comp.ngOnInit();

      expect(comp.entreprisePlan).toEqual(entreprisePlan);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntreprisePlanChad>>();
      const entreprisePlan = { id: 123 };
      jest.spyOn(entreprisePlanFormService, 'getEntreprisePlanChad').mockReturnValue(entreprisePlan);
      jest.spyOn(entreprisePlanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entreprisePlan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entreprisePlan }));
      saveSubject.complete();

      // THEN
      expect(entreprisePlanFormService.getEntreprisePlanChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(entreprisePlanService.update).toHaveBeenCalledWith(expect.objectContaining(entreprisePlan));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntreprisePlanChad>>();
      const entreprisePlan = { id: 123 };
      jest.spyOn(entreprisePlanFormService, 'getEntreprisePlanChad').mockReturnValue({ id: null });
      jest.spyOn(entreprisePlanService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entreprisePlan: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entreprisePlan }));
      saveSubject.complete();

      // THEN
      expect(entreprisePlanFormService.getEntreprisePlanChad).toHaveBeenCalled();
      expect(entreprisePlanService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntreprisePlanChad>>();
      const entreprisePlan = { id: 123 };
      jest.spyOn(entreprisePlanService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entreprisePlan });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(entreprisePlanService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
