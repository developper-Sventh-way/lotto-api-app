import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EntreprisePlanChadDetailComponent } from './entreprise-plan-chad-detail.component';

describe('EntreprisePlanChad Management Detail Component', () => {
  let comp: EntreprisePlanChadDetailComponent;
  let fixture: ComponentFixture<EntreprisePlanChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntreprisePlanChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ entreprisePlan: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EntreprisePlanChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EntreprisePlanChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load entreprisePlan on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.entreprisePlan).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
