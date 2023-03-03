jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RequestTransactionChadService } from '../service/request-transaction-chad.service';

import { RequestTransactionChadDeleteDialogComponent } from './request-transaction-chad-delete-dialog.component';

describe('RequestTransactionChad Management Delete Component', () => {
  let comp: RequestTransactionChadDeleteDialogComponent;
  let fixture: ComponentFixture<RequestTransactionChadDeleteDialogComponent>;
  let service: RequestTransactionChadService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RequestTransactionChadDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(RequestTransactionChadDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RequestTransactionChadDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RequestTransactionChadService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
