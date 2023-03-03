import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEntreprisePlanSaleChad } from '../entreprise-plan-sale-chad.model';
import { EntreprisePlanSaleChadService } from '../service/entreprise-plan-sale-chad.service';

@Injectable({ providedIn: 'root' })
export class EntreprisePlanSaleChadRoutingResolveService implements Resolve<IEntreprisePlanSaleChad | null> {
  constructor(protected service: EntreprisePlanSaleChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntreprisePlanSaleChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((entreprisePlanSale: HttpResponse<IEntreprisePlanSaleChad>) => {
          if (entreprisePlanSale.body) {
            return of(entreprisePlanSale.body);
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
