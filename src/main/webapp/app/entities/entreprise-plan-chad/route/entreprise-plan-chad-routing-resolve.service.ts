import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEntreprisePlanChad } from '../entreprise-plan-chad.model';
import { EntreprisePlanChadService } from '../service/entreprise-plan-chad.service';

@Injectable({ providedIn: 'root' })
export class EntreprisePlanChadRoutingResolveService implements Resolve<IEntreprisePlanChad | null> {
  constructor(protected service: EntreprisePlanChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntreprisePlanChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((entreprisePlan: HttpResponse<IEntreprisePlanChad>) => {
          if (entreprisePlan.body) {
            return of(entreprisePlan.body);
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
