import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StateChadDetailComponent } from './state-chad-detail.component';

describe('StateChad Management Detail Component', () => {
  let comp: StateChadDetailComponent;
  let fixture: ComponentFixture<StateChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StateChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ state: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StateChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StateChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load state on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.state).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
