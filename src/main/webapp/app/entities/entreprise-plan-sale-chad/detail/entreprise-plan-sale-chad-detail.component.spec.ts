import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EntreprisePlanSaleChadDetailComponent } from './entreprise-plan-sale-chad-detail.component';

describe('EntreprisePlanSaleChad Management Detail Component', () => {
  let comp: EntreprisePlanSaleChadDetailComponent;
  let fixture: ComponentFixture<EntreprisePlanSaleChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntreprisePlanSaleChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ entreprisePlanSale: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EntreprisePlanSaleChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EntreprisePlanSaleChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load entreprisePlanSale on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.entreprisePlanSale).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
