import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEntreprisePlanPermissionChad, NewEntreprisePlanPermissionChad } from '../entreprise-plan-permission-chad.model';

export type PartialUpdateEntreprisePlanPermissionChad = Partial<IEntreprisePlanPermissionChad> & Pick<IEntreprisePlanPermissionChad, 'id'>;

export type EntityResponseType = HttpResponse<IEntreprisePlanPermissionChad>;
export type EntityArrayResponseType = HttpResponse<IEntreprisePlanPermissionChad[]>;

@Injectable({ providedIn: 'root' })
export class EntreprisePlanPermissionChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/entreprise-plan-permissions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(entreprisePlanPermission: NewEntreprisePlanPermissionChad): Observable<EntityResponseType> {
    return this.http.post<IEntreprisePlanPermissionChad>(this.resourceUrl, entreprisePlanPermission, { observe: 'response' });
  }

  update(entreprisePlanPermission: IEntreprisePlanPermissionChad): Observable<EntityResponseType> {
    return this.http.put<IEntreprisePlanPermissionChad>(
      `${this.resourceUrl}/${this.getEntreprisePlanPermissionChadIdentifier(entreprisePlanPermission)}`,
      entreprisePlanPermission,
      { observe: 'response' }
    );
  }

  partialUpdate(entreprisePlanPermission: PartialUpdateEntreprisePlanPermissionChad): Observable<EntityResponseType> {
    return this.http.patch<IEntreprisePlanPermissionChad>(
      `${this.resourceUrl}/${this.getEntreprisePlanPermissionChadIdentifier(entreprisePlanPermission)}`,
      entreprisePlanPermission,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEntreprisePlanPermissionChad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEntreprisePlanPermissionChad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEntreprisePlanPermissionChadIdentifier(entreprisePlanPermission: Pick<IEntreprisePlanPermissionChad, 'id'>): number {
    return entreprisePlanPermission.id;
  }

  compareEntreprisePlanPermissionChad(
    o1: Pick<IEntreprisePlanPermissionChad, 'id'> | null,
    o2: Pick<IEntreprisePlanPermissionChad, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getEntreprisePlanPermissionChadIdentifier(o1) === this.getEntreprisePlanPermissionChadIdentifier(o2) : o1 === o2;
  }

  addEntreprisePlanPermissionChadToCollectionIfMissing<Type extends Pick<IEntreprisePlanPermissionChad, 'id'>>(
    entreprisePlanPermissionCollection: Type[],
    ...entreprisePlanPermissionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const entreprisePlanPermissions: Type[] = entreprisePlanPermissionsToCheck.filter(isPresent);
    if (entreprisePlanPermissions.length > 0) {
      const entreprisePlanPermissionCollectionIdentifiers = entreprisePlanPermissionCollection.map(
        entreprisePlanPermissionItem => this.getEntreprisePlanPermissionChadIdentifier(entreprisePlanPermissionItem)!
      );
      const entreprisePlanPermissionsToAdd = entreprisePlanPermissions.filter(entreprisePlanPermissionItem => {
        const entreprisePlanPermissionIdentifier = this.getEntreprisePlanPermissionChadIdentifier(entreprisePlanPermissionItem);
        if (entreprisePlanPermissionCollectionIdentifiers.includes(entreprisePlanPermissionIdentifier)) {
          return false;
        }
        entreprisePlanPermissionCollectionIdentifiers.push(entreprisePlanPermissionIdentifier);
        return true;
      });
      return [...entreprisePlanPermissionsToAdd, ...entreprisePlanPermissionCollection];
    }
    return entreprisePlanPermissionCollection;
  }
}
