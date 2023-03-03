import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStateChad } from '../state-chad.model';
import { StateChadService } from '../service/state-chad.service';

@Injectable({ providedIn: 'root' })
export class StateChadRoutingResolveService implements Resolve<IStateChad | null> {
  constructor(protected service: StateChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStateChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((state: HttpResponse<IStateChad>) => {
          if (state.body) {
            return of(state.body);
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
