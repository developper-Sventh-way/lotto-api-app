import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStateConfigurationChad, NewStateConfigurationChad } from '../state-configuration-chad.model';

export type PartialUpdateStateConfigurationChad = Partial<IStateConfigurationChad> & Pick<IStateConfigurationChad, 'id'>;

export type EntityResponseType = HttpResponse<IStateConfigurationChad>;
export type EntityArrayResponseType = HttpResponse<IStateConfigurationChad[]>;

@Injectable({ providedIn: 'root' })
export class StateConfigurationChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/state-configurations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(stateConfiguration: NewStateConfigurationChad): Observable<EntityResponseType> {
    return this.http.post<IStateConfigurationChad>(this.resourceUrl, stateConfiguration, { observe: 'response' });
  }

  update(stateConfiguration: IStateConfigurationChad): Observable<EntityResponseType> {
    return this.http.put<IStateConfigurationChad>(
      `${this.resourceUrl}/${this.getStateConfigurationChadIdentifier(stateConfiguration)}`,
      stateConfiguration,
      { observe: 'response' }
    );
  }

  partialUpdate(stateConfiguration: PartialUpdateStateConfigurationChad): Observable<EntityResponseType> {
    return this.http.patch<IStateConfigurationChad>(
      `${this.resourceUrl}/${this.getStateConfigurationChadIdentifier(stateConfiguration)}`,
      stateConfiguration,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStateConfigurationChad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStateConfigurationChad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getStateConfigurationChadIdentifier(stateConfiguration: Pick<IStateConfigurationChad, 'id'>): number {
    return stateConfiguration.id;
  }

  compareStateConfigurationChad(o1: Pick<IStateConfigurationChad, 'id'> | null, o2: Pick<IStateConfigurationChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getStateConfigurationChadIdentifier(o1) === this.getStateConfigurationChadIdentifier(o2) : o1 === o2;
  }

  addStateConfigurationChadToCollectionIfMissing<Type extends Pick<IStateConfigurationChad, 'id'>>(
    stateConfigurationCollection: Type[],
    ...stateConfigurationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const stateConfigurations: Type[] = stateConfigurationsToCheck.filter(isPresent);
    if (stateConfigurations.length > 0) {
      const stateConfigurationCollectionIdentifiers = stateConfigurationCollection.map(
        stateConfigurationItem => this.getStateConfigurationChadIdentifier(stateConfigurationItem)!
      );
      const stateConfigurationsToAdd = stateConfigurations.filter(stateConfigurationItem => {
        const stateConfigurationIdentifier = this.getStateConfigurationChadIdentifier(stateConfigurationItem);
        if (stateConfigurationCollectionIdentifiers.includes(stateConfigurationIdentifier)) {
          return false;
        }
        stateConfigurationCollectionIdentifiers.push(stateConfigurationIdentifier);
        return true;
      });
      return [...stateConfigurationsToAdd, ...stateConfigurationCollection];
    }
    return stateConfigurationCollection;
  }
}
