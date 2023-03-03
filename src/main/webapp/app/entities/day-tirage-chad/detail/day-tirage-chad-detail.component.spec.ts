import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DayTirageChadDetailComponent } from './day-tirage-chad-detail.component';

describe('DayTirageChad Management Detail Component', () => {
  let comp: DayTirageChadDetailComponent;
  let fixture: ComponentFixture<DayTirageChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayTirageChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ dayTirage: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DayTirageChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DayTirageChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load dayTirage on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.dayTirage).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
