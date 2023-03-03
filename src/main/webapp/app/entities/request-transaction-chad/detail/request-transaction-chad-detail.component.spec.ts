import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RequestTransactionChadDetailComponent } from './request-transaction-chad-detail.component';

describe('RequestTransactionChad Management Detail Component', () => {
  let comp: RequestTransactionChadDetailComponent;
  let fixture: ComponentFixture<RequestTransactionChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestTransactionChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ requestTransaction: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RequestTransactionChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RequestTransactionChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load requestTransaction on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.requestTransaction).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
