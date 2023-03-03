import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StateConfigurationChadDetailComponent } from './state-configuration-chad-detail.component';

describe('StateConfigurationChad Management Detail Component', () => {
  let comp: StateConfigurationChadDetailComponent;
  let fixture: ComponentFixture<StateConfigurationChadDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StateConfigurationChadDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ stateConfiguration: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(StateConfigurationChadDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(StateConfigurationChadDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load stateConfiguration on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.stateConfiguration).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
