import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRequestTransactionChad, NewRequestTransactionChad } from '../request-transaction-chad.model';

export type PartialUpdateRequestTransactionChad = Partial<IRequestTransactionChad> & Pick<IRequestTransactionChad, 'id'>;

type RestOf<T extends IRequestTransactionChad | NewRequestTransactionChad> = Omit<T, 'dateTransaction'> & {
  dateTransaction?: string | null;
};

export type RestRequestTransactionChad = RestOf<IRequestTransactionChad>;

export type NewRestRequestTransactionChad = RestOf<NewRequestTransactionChad>;

export type PartialUpdateRestRequestTransactionChad = RestOf<PartialUpdateRequestTransactionChad>;

export type EntityResponseType = HttpResponse<IRequestTransactionChad>;
export type EntityArrayResponseType = HttpResponse<IRequestTransactionChad[]>;

@Injectable({ providedIn: 'root' })
export class RequestTransactionChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/request-transactions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(requestTransaction: NewRequestTransactionChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(requestTransaction);
    return this.http
      .post<RestRequestTransactionChad>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(requestTransaction: IRequestTransactionChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(requestTransaction);
    return this.http
      .put<RestRequestTransactionChad>(`${this.resourceUrl}/${this.getRequestTransactionChadIdentifier(requestTransaction)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(requestTransaction: PartialUpdateRequestTransactionChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(requestTransaction);
    return this.http
      .patch<RestRequestTransactionChad>(`${this.resourceUrl}/${this.getRequestTransactionChadIdentifier(requestTransaction)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestRequestTransactionChad>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestRequestTransactionChad[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRequestTransactionChadIdentifier(requestTransaction: Pick<IRequestTransactionChad, 'id'>): number {
    return requestTransaction.id;
  }

  compareRequestTransactionChad(o1: Pick<IRequestTransactionChad, 'id'> | null, o2: Pick<IRequestTransactionChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getRequestTransactionChadIdentifier(o1) === this.getRequestTransactionChadIdentifier(o2) : o1 === o2;
  }

  addRequestTransactionChadToCollectionIfMissing<Type extends Pick<IRequestTransactionChad, 'id'>>(
    requestTransactionCollection: Type[],
    ...requestTransactionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const requestTransactions: Type[] = requestTransactionsToCheck.filter(isPresent);
    if (requestTransactions.length > 0) {
      const requestTransactionCollectionIdentifiers = requestTransactionCollection.map(
        requestTransactionItem => this.getRequestTransactionChadIdentifier(requestTransactionItem)!
      );
      const requestTransactionsToAdd = requestTransactions.filter(requestTransactionItem => {
        const requestTransactionIdentifier = this.getRequestTransactionChadIdentifier(requestTransactionItem);
        if (requestTransactionCollectionIdentifiers.includes(requestTransactionIdentifier)) {
          return false;
        }
        requestTransactionCollectionIdentifiers.push(requestTransactionIdentifier);
        return true;
      });
      return [...requestTransactionsToAdd, ...requestTransactionCollection];
    }
    return requestTransactionCollection;
  }

  protected convertDateFromClient<T extends IRequestTransactionChad | NewRequestTransactionChad | PartialUpdateRequestTransactionChad>(
    requestTransaction: T
  ): RestOf<T> {
    return {
      ...requestTransaction,
      dateTransaction: requestTransaction.dateTransaction?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restRequestTransactionChad: RestRequestTransactionChad): IRequestTransactionChad {
    return {
      ...restRequestTransactionChad,
      dateTransaction: restRequestTransactionChad.dateTransaction ? dayjs(restRequestTransactionChad.dateTransaction) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestRequestTransactionChad>): HttpResponse<IRequestTransactionChad> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestRequestTransactionChad[]>): HttpResponse<IRequestTransactionChad[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
