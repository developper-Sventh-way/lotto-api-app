import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { StateConfigurationChadFormService } from './state-configuration-chad-form.service';
import { StateConfigurationChadService } from '../service/state-configuration-chad.service';
import { IStateConfigurationChad } from '../state-configuration-chad.model';
import { IStateChad } from 'app/entities/state-chad/state-chad.model';
import { StateChadService } from 'app/entities/state-chad/service/state-chad.service';

import { StateConfigurationChadUpdateComponent } from './state-configuration-chad-update.component';

describe('StateConfigurationChad Management Update Component', () => {
  let comp: StateConfigurationChadUpdateComponent;
  let fixture: ComponentFixture<StateConfigurationChadUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let stateConfigurationFormService: StateConfigurationChadFormService;
  let stateConfigurationService: StateConfigurationChadService;
  let stateService: StateChadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [StateConfigurationChadUpdateComponent],
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
      .overrideTemplate(StateConfigurationChadUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StateConfigurationChadUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    stateConfigurationFormService = TestBed.inject(StateConfigurationChadFormService);
    stateConfigurationService = TestBed.inject(StateConfigurationChadService);
    stateService = TestBed.inject(StateChadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call StateChad query and add missing value', () => {
      const stateConfiguration: IStateConfigurationChad = { id: 456 };
      const state: IStateChad = { id: 17717 };
      stateConfiguration.state = state;

      const stateCollection: IStateChad[] = [{ id: 53432 }];
      jest.spyOn(stateService, 'query').mockReturnValue(of(new HttpResponse({ body: stateCollection })));
      const additionalStateChads = [state];
      const expectedCollection: IStateChad[] = [...additionalStateChads, ...stateCollection];
      jest.spyOn(stateService, 'addStateChadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ stateConfiguration });
      comp.ngOnInit();

      expect(stateService.query).toHaveBeenCalled();
      expect(stateService.addStateChadToCollectionIfMissing).toHaveBeenCalledWith(
        stateCollection,
        ...additionalStateChads.map(expect.objectContaining)
      );
      expect(comp.statesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const stateConfiguration: IStateConfigurationChad = { id: 456 };
      const state: IStateChad = { id: 2539 };
      stateConfiguration.state = state;

      activatedRoute.data = of({ stateConfiguration });
      comp.ngOnInit();

      expect(comp.statesSharedCollection).toContain(state);
      expect(comp.stateConfiguration).toEqual(stateConfiguration);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStateConfigurationChad>>();
      const stateConfiguration = { id: 123 };
      jest.spyOn(stateConfigurationFormService, 'getStateConfigurationChad').mockReturnValue(stateConfiguration);
      jest.spyOn(stateConfigurationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stateConfiguration });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: stateConfiguration }));
      saveSubject.complete();

      // THEN
      expect(stateConfigurationFormService.getStateConfigurationChad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(stateConfigurationService.update).toHaveBeenCalledWith(expect.objectContaining(stateConfiguration));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStateConfigurationChad>>();
      const stateConfiguration = { id: 123 };
      jest.spyOn(stateConfigurationFormService, 'getStateConfigurationChad').mockReturnValue({ id: null });
      jest.spyOn(stateConfigurationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stateConfiguration: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: stateConfiguration }));
      saveSubject.complete();

      // THEN
      expect(stateConfigurationFormService.getStateConfigurationChad).toHaveBeenCalled();
      expect(stateConfigurationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStateConfigurationChad>>();
      const stateConfiguration = { id: 123 };
      jest.spyOn(stateConfigurationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ stateConfiguration });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(stateConfigurationService.update).toHaveBeenCalled();
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
