import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RequestTransactionChadFormService } from './request-transaction-chad-form.service';
import { RequestTransactionChadService } from '../service/request-transaction-chad.service';
import { IRequestTransactionChad } from '../request-transaction-chad.model';
import { IEntreprisePlanSaleChad } from 'app/entities/entreprise-plan-sale-chad/entreprise-plan-sale-chad.model';
import { EntreprisePlanSaleChadService } from 'app/entities/entreprise-plan-sale-chad/service/entreprise-plan-sale-chad.service';
import { IEntrepriseChad } from 'app/entities/entreprise-chad/entreprise-chad.model';
import { EntrepriseChadService } from 'app/entities/entreprise-chad/service/entreprise-chad.service';

import { RequestTransactionChadUpdateComponent } from './request-transaction-chad-update.component';

describe('RequestTransactionChad Management Update Component', () => {
  let comp: RequestTransactionChadUpdateComponent;
  let fixture: ComponentFixture<RequestTransactionChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let requestTransactionFormService: RequestTransactionChadFormService;
  let requestTransactionService: RequestTransactionChadService;
  let entreprisePlanSaleService: EntreprisePlanSaleChadService;
  let entrepriseService: EntrepriseChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RequestTransactionChadUpdateComponent],
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
      .overrideTemplate(RequestTransactionChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RequestTransactionChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    requestTransactionFormService = TestBed.inject(RequestTransactionChadFormService);
    requestTransactionService = TestBed.inject(RequestTransactionChadService);
    entreprisePlanSaleService = TestBed.inject(EntreprisePlanSaleChadService);
    entrepriseService = TestBed.inject(EntrepriseChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call EntreprisePlanSaleChad query and add missing value', () => {
      const requestTransaction: IRequestTransactionChad = { id: 456 };
      const entreprisePlanSale: IEntreprisePlanSaleChad = { id: 1732 };
      requestTransaction.entreprisePlanSale = entreprisePlanSale;

      const entreprisePlanSaleCollection: IEntreprisePlanSaleChad[] = [{ id: 97267 }];
      jest.spyOn(entreprisePlanSaleService, 'query').mockReturnValue(of(new HttpResponse({ body: entreprisePlanSaleCollection })));
      const additionalEntreprisePlanSaleChads = [entreprisePlanSale];
      const expectedCollection: IEntreprisePlanSaleChad[] = [...additionalEntreprisePlanSaleChads, ...entreprisePlanSaleCollection];
      jest.spyOn(entreprisePlanSaleService, 'addEntreprisePlanSaleChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ requestTransaction });
      comp.ngOnInit();

      expect(entreprisePlanSaleService.query).toHaveBeenCalled();
      expect(entreprisePlanSaleService.addEntreprisePlanSaleChadToCollectionIfMissing).toHaveBeenCalledWith(
        entreprisePlanSaleCollection,
        ...additionalEntreprisePlanSaleChads.map(expect.objectContaining)
      );
      expect(comp.entreprisePlanSalesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call EntrepriseChad query and add missing value', () => {
      const requestTransaction: IRequestTransactionChad = { id: 456 };
      const entreprise: IEntrepriseChad = { id: 15953 };
      requestTransaction.entreprise = entreprise;

      const entrepriseCollection: IEntrepriseChad[] = [{ id: 18497 }];
      jest.spyOn(entrepriseService, 'query').mockReturnValue(of(new HttpResponse({ body: entrepriseCollection })));
      const additionalEntrepriseChads = [entreprise];
      const expectedCollection: IEntrepriseChad[] = [...additionalEntrepriseChads, ...entrepriseCollection];
      jest.spyOn(entrepriseService, 'addEntrepriseChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ requestTransaction });
      comp.ngOnInit();

      expect(entrepriseService.query).toHaveBeenCalled();
      expect(entrepriseService.addEntrepriseChadToCollectionIfMissing).toHaveBeenCalledWith(
        entrepriseCollection,
        ...additionalEntrepriseChads.map(expect.objectContaining)
      );
      expect(comp.entreprisesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const requestTransaction: IRequestTransactionChad = { id: 456 };
      const entreprisePlanSale: IEntreprisePlanSaleChad = { id: 24434 };
      requestTransaction.entreprisePlanSale = entreprisePlanSale;
      const entreprise: IEntrepriseChad = { id: 81989 };
      requestTransaction.entreprise = entreprise;

      activatedRoute.data = of({ requestTransaction });
      comp.ngOnInit();

      expect(comp.entreprisePlanSalesSharedCollection).toContain(entreprisePlanSale);
      expect(comp.entreprisesSharedCollection).toContain(entreprise);
      expect(comp.requestTransaction).toEqual(requestTransaction);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRequestTransactionChad>>();
      const requestTransaction = { id: 123 };
      jest.spyOn(requestTransactionFormService, 'getRequestTransactionChad').mockReturnValue(requestTransaction);
      jest.spyOn(requestTransactionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ requestTransaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: requestTransaction }));
      saveSubject.complete();

      // THEN
      expect(requestTransactionFormService.getRequestTransactionChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(requestTransactionService.update).toHaveBeenCalledWith(expect.objectContaining(requestTransaction));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRequestTransactionChad>>();
      const requestTransaction = { id: 123 };
      jest.spyOn(requestTransactionFormService, 'getRequestTransactionChad').mockReturnValue({ id: null });
      jest.spyOn(requestTransactionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ requestTransaction: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: requestTransaction }));
      saveSubject.complete();

      // THEN
      expect(requestTransactionFormService.getRequestTransactionChad).toHaveBeenCalled();
      expect(requestTransactionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRequestTransactionChad>>();
      const requestTransaction = { id: 123 };
      jest.spyOn(requestTransactionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ requestTransaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(requestTransactionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEntreprisePlanSaleChad', () => {
      it('Should forward to entreprisePlanSaleService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(entreprisePlanSaleService, 'compareEntreprisePlanSaleChad');
        comp.compareEntreprisePlanSaleChad(entity, entity2);
        expect(entreprisePlanSaleService.compareEntreprisePlanSaleChad).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareEntrepriseChad', () => {
      it('Should forward to entrepriseService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(entrepriseService, 'compareEntrepriseChad');
        comp.compareEntrepriseChad(entity, entity2);
        expect(entrepriseService.compareEntrepriseChad).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
