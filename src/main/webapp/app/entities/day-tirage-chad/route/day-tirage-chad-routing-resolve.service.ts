import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDayTirageChad } from '../day-tirage-chad.model';
import { DayTirageChadService } from '../service/day-tirage-chad.service';

@Injectable({ providedIn: 'root' })
export class DayTirageChadRoutingResolveService implements Resolve<IDayTirageChad | null> {
  constructor(protected service: DayTirageChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDayTirageChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((dayTirage: HttpResponse<IDayTirageChad>) => {
          if (dayTirage.body) {
            return of(dayTirage.body);
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
