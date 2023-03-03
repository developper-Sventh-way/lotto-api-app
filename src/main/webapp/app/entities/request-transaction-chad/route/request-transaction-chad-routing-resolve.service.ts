import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRequestTransactionChad } from '../request-transaction-chad.model';
import { RequestTransactionChadService } from '../service/request-transaction-chad.service';

@Injectable({ providedIn: 'root' })
export class RequestTransactionChadRoutingResolveService implements Resolve<IRequestTransactionChad | null> {
  constructor(protected service: RequestTransactionChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRequestTransactionChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((requestTransaction: HttpResponse<IRequestTransactionChad>) => {
          if (requestTransaction.body) {
            return of(requestTransaction.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
