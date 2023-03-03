import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EntreprisePlanSaleChadFormService } from './entreprise-plan-sale-chad-form.service';
import { EntreprisePlanSaleChadService } from '../service/entreprise-plan-sale-chad.service';
import { IEntreprisePlanSaleChad } from '../entreprise-plan-sale-chad.model';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { EntrepriseChadService } from 'app/entities/entreprise-chad/service/entreprise-chad.service';
import { IEntreprisePlanChad } from 'app/entities/entreprise-plan-chad/entreprise-plan-chad.model';
import { EntreprisePlanChadService } from 'app/entities/entreprise-plan-chad/service/entreprise-plan-chad.service';

import { EntreprisePlanSaleChadUpdateComponent } from './entreprise-plan-sale-chad-update.component';

describe('EntreprisePlanSaleChad Management Update Component', () => {
  let comp: EntreprisePlanSaleChadUpdateComponent;
  let fixture: ComponentFixture<EntreprisePlanSaleChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let entreprisePlanSaleFormService: EntreprisePlanSaleChadFormService;
  let entreprisePlanSaleService: EntreprisePlanSaleChadService;
  let entrepriseService: EntrepriseChadService;
  let entreprisePlanService: EntreprisePlanChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EntreprisePlanSaleChadUpdateComponent],
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
      .overrideTemplate(EntreprisePlanSaleChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EntreprisePlanSaleChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    entreprisePlanSaleFormService = TestBed.inject(EntreprisePlanSaleChadFormService);
    entreprisePlanSaleService = TestBed.inject(EntreprisePlanSaleChadService);
    entrepriseService = TestBed.inject(EntrepriseChadService);
    entreprisePlanService = TestBed.inject(EntreprisePlanChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call EntrepriseChad query and add missing value', () => {
      const entreprisePlanSale: IEntreprisePlanSaleChad = { id: 456 };
      const entreprise: IEntrepriseChad = { id: 66983 };
      entreprisePlanSale.entreprise = entreprise;

      const entrepriseCollection: IEntrepriseChad[] = [{ id: 28135 }];
      jest.spyOn(entrepriseService, 'query').mockReturnValue(of(new HttpResponse({ body: entrepriseCollection })));
      const additionalEntrepriseChads = [entreprise];
      const expectedCollection: IEntrepriseChad[] = [...additionalEntrepriseChads, ...entrepriseCollection];
      jest.spyOn(entrepriseService, 'addEntrepriseChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ entreprisePlanSale });
      comp.ngOnInit();

      expect(entrepriseService.query).toHaveBeenCalled();
      expect(entrepriseService.addEntrepriseChadToCollectionIfMissing).toHaveBeenCalledWith(
        entrepriseCollection,
        ...additionalEntrepriseChads.map(expect.objectContaining)
      );
      expect(comp.entreprisesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call EntreprisePlanChad query and add missing value', () => {
      const entreprisePlanSale: IEntreprisePlanSaleChad = { id: 456 };
      const entreprisePlan: IEntreprisePlanChad = { id: 261 };
      entreprisePlanSale.entreprisePlan = entreprisePlan;

      const entreprisePlanCollection: IEntreprisePlanChad[] = [{ id: 9793 }];
      jest.spyOn(entreprisePlanService, 'query').mockReturnValue(of(new HttpResponse({ body: entreprisePlanCollection })));
      const additionalEntreprisePlanChads = [entreprisePlan];
      const expectedCollection: IEntreprisePlanChad[] = [...additionalEntreprisePlanChads, ...entreprisePlanCollection];
      jest.spyOn(entreprisePlanService, 'addEntreprisePlanChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ entreprisePlanSale });
      comp.ngOnInit();

      expect(entreprisePlanService.query).toHaveBeenCalled();
      expect(entreprisePlanService.addEntreprisePlanChadToCollectionIfMissing).toHaveBeenCalledWith(
        entreprisePlanCollection,
        ...additionalEntreprisePlanChads.map(expect.objectContaining)
      );
      expect(comp.entreprisePlansSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const entreprisePlanSale: IEntreprisePlanSaleChad = { id: 456 };
      const entreprise: IEntrepriseChad = { id: 6114 };
      entreprisePlanSale.entreprise = entreprise;
      const entreprisePlan: IEntreprisePlanChad = { id: 87213 };
      entreprisePlanSale.entreprisePlan = entreprisePlan;

      activatedRoute.data = of({ entreprisePlanSale });
      comp.ngOnInit();

      expect(comp.entreprisesSharedCollection).toContain(entreprise);
      expect(comp.entreprisePlansSharedCollection).toContain(entreprisePlan);
      expect(comp.entreprisePlanSale).toEqual(entreprisePlanSale);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntreprisePlanSaleChad>>();
      const entreprisePlanSale = { id: 123 };
      jest.spyOn(entreprisePlanSaleFormService, 'getEntreprisePlanSaleChad').mockReturnValue(entreprisePlanSale);
      jest.spyOn(entreprisePlanSaleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entreprisePlanSale });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entreprisePlanSale }));
      saveSubject.complete();

      // THEN
      expect(entreprisePlanSaleFormService.getEntreprisePlanSaleChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(entreprisePlanSaleService.update).toHaveBeenCalledWith(expect.objectContaining(entreprisePlanSale));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntreprisePlanSaleChad>>();
      const entreprisePlanSale = { id: 123 };
      jest.spyOn(entreprisePlanSaleFormService, 'getEntreprisePlanSaleChad').mockReturnValue({ id: null });
      jest.spyOn(entreprisePlanSaleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entreprisePlanSale: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: entreprisePlanSale }));
      saveSubject.complete();

      // THEN
      expect(entreprisePlanSaleFormService.getEntreprisePlanSaleChad).toHaveBeenCalled();
      expect(entreprisePlanSaleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEntreprisePlanSaleChad>>();
      const entreprisePlanSale = { id: 123 };
      jest.spyOn(entreprisePlanSaleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ entreprisePlanSale });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(entreprisePlanSaleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEntrepriseChad', () => {
      it('Should forward to entrepriseService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(entrepriseService, 'compareEntrepriseChad');
        comp.compareEntrepriseChad(entity, entity2);
        expect(entrepriseService.compareEntrepriseChad).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareEntreprisePlanChad', () => {
      it('Should forward to entreprisePlanService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(entreprisePlanService, 'compareEntreprisePlanChad');
        comp.compareEntreprisePlanChad(entity, entity2);
        expect(entreprisePlanService.compareEntreprisePlanChad).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
