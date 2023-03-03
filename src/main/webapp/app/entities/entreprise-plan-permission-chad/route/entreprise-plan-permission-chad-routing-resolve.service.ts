import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEntreprisePlanPermissionChad } from '../entreprise-plan-permission-chad.model';
import { EntreprisePlanPermissionChadService } from '../service/entreprise-plan-permission-chad.service';

@Injectable({ providedIn: 'root' })
export class EntreprisePlanPermissionChadRoutingResolveService implements Resolve<IEntreprisePlanPermissionChad | null> {
  constructor(protected service: EntreprisePlanPermissionChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntreprisePlanPermissionChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((entreprisePlanPermission: HttpResponse<IEntreprisePlanPermissionChad>) => {
          if (entreprisePlanPermission.body) {
            return of(entreprisePlanPermission.body);
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
