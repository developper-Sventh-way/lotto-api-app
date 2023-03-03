import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IStateChad, NewStateChad } from '../state-chad.model';

export type PartialUpdateStateChad = Partial<IStateChad> & Pick<IStateChad, 'id'>;

export type EntityResponseType = HttpResponse<IStateChad>;
export type EntityArrayResponseType = HttpResponse<IStateChad[]>;

@Injectable({ providedIn: 'root' })
export class StateChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/states');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(state: NewStateChad): Observable<EntityResponseType> {
    return this.http.post<IStateChad>(this.resourceUrl, state, { observe: 'response' });
  }

  update(state: IStateChad): Observable<EntityResponseType> {
    return this.http.put<IStateChad>(`${this.resourceUrl}/${this.getStateChadIdentifier(state)}`, state, { observe: 'response' });
  }

  partialUpdate(state: PartialUpdateStateChad): Observable<EntityResponseType> {
    return this.http.patch<IStateChad>(`${this.resourceUrl}/${this.getStateChadIdentifier(state)}`, state, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStateChad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStateChad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getStateChadIdentifier(state: Pick<IStateChad, 'id'>): number {
    return state.id;
  }

  compareStateChad(o1: Pick<IStateChad, 'id'> | null, o2: Pick<IStateChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getStateChadIdentifier(o1) === this.getStateChadIdentifier(o2) : o1 === o2;
  }

  addStateChadToCollectionIfMissing<Type extends Pick<IStateChad, 'id'>>(
    stateCollection: Type[],
    ...statesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const states: Type[] = statesToCheck.filter(isPresent);
    if (states.length > 0) {
      const stateCollectionIdentifiers = stateCollection.map(stateItem => this.getStateChadIdentifier(stateItem)!);
      const statesToAdd = states.filter(stateItem => {
        const stateIdentifier = this.getStateChadIdentifier(stateItem);
        if (stateCollectionIdentifiers.includes(stateIdentifier)) {
          return false;
        }
        stateCollectionIdentifiers.push(stateIdentifier);
        return true;
      });
      return [...statesToAdd, ...stateCollection];
    }
    return stateCollection;
  }
}
