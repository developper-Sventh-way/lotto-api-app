import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EntreprisePlanPermissionChadDetailComponent } from './entreprise-plan-permission-chad-detail.component';

describe('EntreprisePlanPermissionChad Management Detail Component', () => {
  let comp: EntreprisePlanPermissionChadDetailComponent;
  let fixture: ComponentFixture<EntreprisePlanPermissionChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntreprisePlanPermissionChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ entreprisePlanPermission: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EntreprisePlanPermissionChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EntreprisePlanPermissionChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load entreprisePlanPermission on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.entreprisePlanPermission).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
