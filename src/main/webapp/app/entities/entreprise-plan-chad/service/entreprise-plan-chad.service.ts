import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEntreprisePlanChad, NewEntreprisePlanChad } from '../entreprise-plan-chad.model';

export type PartialUpdateEntreprisePlanChad = Partial<IEntreprisePlanChad> & Pick<IEntreprisePlanChad, 'id'>;

export type EntityResponseType = HttpResponse<IEntreprisePlanChad>;
export type EntityArrayResponseType = HttpResponse<IEntreprisePlanChad[]>;

@Injectable({ providedIn: 'root' })
export class EntreprisePlanChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/entreprise-plans');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(entreprisePlan: NewEntreprisePlanChad): Observable<EntityResponseType> {
    return this.http.post<IEntreprisePlanChad>(this.resourceUrl, entreprisePlan, { observe: 'response' });
  }

  update(entreprisePlan: IEntreprisePlanChad): Observable<EntityResponseType> {
    return this.http.put<IEntreprisePlanChad>(
      `${this.resourceUrl}/${this.getEntreprisePlanChadIdentifier(entreprisePlan)}`,
      entreprisePlan,
      { observe: 'response' }
    );
  }

  partialUpdate(entreprisePlan: PartialUpdateEntreprisePlanChad): Observable<EntityResponseType> {
    return this.http.patch<IEntreprisePlanChad>(
      `${this.resourceUrl}/${this.getEntreprisePlanChadIdentifier(entreprisePlan)}`,
      entreprisePlan,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEntreprisePlanChad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntreprisePlanChad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEntreprisePlanChadIdentifier(entreprisePlan: Pick<IEntreprisePlanChad, 'id'>): number {
    return entreprisePlan.id;
  }

  compareEntreprisePlanChad(o1: Pick<IEntreprisePlanChad, 'id'> | null, o2: Pick<IEntreprisePlanChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getEntreprisePlanChadIdentifier(o1) === this.getEntreprisePlanChadIdentifier(o2) : o1 === o2;
  }

  addEntreprisePlanChadToCollectionIfMissing<Type extends Pick<IEntreprisePlanChad, 'id'>>(
    entreprisePlanCollection: Type[],
    ...entreprisePlansToCheck: (Type | null | undefined)[]
  ): Type[] {
    const entreprisePlans: Type[] = entreprisePlansToCheck.filter(isPresent);
    if (entreprisePlans.length > 0) {
      const entreprisePlanCollectionIdentifiers = entreprisePlanCollection.map(
        entreprisePlanItem => this.getEntreprisePlanChadIdentifier(entreprisePlanItem)!
      );
      const entreprisePlansToAdd = entreprisePlans.filter(entreprisePlanItem => {
        const entreprisePlanIdentifier = this.getEntreprisePlanChadIdentifier(entreprisePlanItem);
        if (entreprisePlanCollectionIdentifiers.includes(entreprisePlanIdentifier)) {
          return false;
        }
        entreprisePlanCollectionIdentifiers.push(entreprisePlanIdentifier);
        return true;
      });
      return [...entreprisePlansToAdd, ...entreprisePlanCollection];
    }
    return entreprisePlanCollection;
  }
}
