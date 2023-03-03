import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStateConfigurationChad } from '../state-configuration-chad.model';
import { StateConfigurationChadService } from '../service/state-configuration-chad.service';

@Injectable({ providedIn: 'root' })
export class StateConfigurationChadRoutingResolveService implements Resolve<IStateConfigurationChad | null> {
  constructor(protected service: StateConfigurationChadService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStateConfigurationChad | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((stateConfiguration: HttpResponse<IStateConfigurationChad>) => {
          if (stateConfiguration.body) {
            return of(stateConfiguration.body);
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
