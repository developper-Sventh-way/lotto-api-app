import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEntreprisePlanSaleChad, NewEntreprisePlanSaleChad } from '../entreprise-plan-sale-chad.model';

export type PartialUpdateEntreprisePlanSaleChad = Partial<IEntreprisePlanSaleChad> & Pick<IEntreprisePlanSaleChad, 'id'>;

type RestOf<T extends IEntreprisePlanSaleChad | NewEntreprisePlanSaleChad> = Omit<T, 'startDate' | 'expirateDate'> & {
  startDate?: string | null;
  expirateDate?: string | null;
};

export type RestEntreprisePlanSaleChad = RestOf<IEntreprisePlanSaleChad>;

export type NewRestEntreprisePlanSaleChad = RestOf<NewEntreprisePlanSaleChad>;

export type PartialUpdateRestEntreprisePlanSaleChad = RestOf<PartialUpdateEntreprisePlanSaleChad>;

export type EntityResponseType = HttpResponse<IEntreprisePlanSaleChad>;
export type EntityArrayResponseType = HttpResponse<IEntreprisePlanSaleChad[]>;

@Injectable({ providedIn: 'root' })
export class EntreprisePlanSaleChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/entreprise-plan-sales');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(entreprisePlanSale: NewEntreprisePlanSaleChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(entreprisePlanSale);
    return this.http
      .post<RestEntreprisePlanSaleChad>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(entreprisePlanSale: IEntreprisePlanSaleChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(entreprisePlanSale);
    return this.http
      .put<RestEntreprisePlanSaleChad>(`${this.resourceUrl}/${this.getEntreprisePlanSaleChadIdentifier(entreprisePlanSale)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(entreprisePlanSale: PartialUpdateEntreprisePlanSaleChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(entreprisePlanSale);
    return this.http
      .patch<RestEntreprisePlanSaleChad>(`${this.resourceUrl}/${this.getEntreprisePlanSaleChadIdentifier(entreprisePlanSale)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestEntreprisePlanSaleChad>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestEntreprisePlanSaleChad[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEntreprisePlanSaleChadIdentifier(entreprisePlanSale: Pick<IEntreprisePlanSaleChad, 'id'>): number {
    return entreprisePlanSale.id;
  }

  compareEntreprisePlanSaleChad(o1: Pick<IEntreprisePlanSaleChad, 'id'> | null, o2: Pick<IEntreprisePlanSaleChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getEntreprisePlanSaleChadIdentifier(o1) === this.getEntreprisePlanSaleChadIdentifier(o2) : o1 === o2;
  }

  addEntreprisePlanSaleChadToCollectionIfMissing<Type extends Pick<IEntreprisePlanSaleChad, 'id'>>(
    entreprisePlanSaleCollection: Type[],
    ...entreprisePlanSalesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const entreprisePlanSales: Type[] = entreprisePlanSalesToCheck.filter(isPresent);
    if (entreprisePlanSales.length > 0) {
      const entreprisePlanSaleCollectionIdentifiers = entreprisePlanSaleCollection.map(
        entreprisePlanSaleItem => this.getEntreprisePlanSaleChadIdentifier(entreprisePlanSaleItem)!
      );
      const entreprisePlanSalesToAdd = entreprisePlanSales.filter(entreprisePlanSaleItem => {
        const entreprisePlanSaleIdentifier = this.getEntreprisePlanSaleChadIdentifier(entreprisePlanSaleItem);
        if (entreprisePlanSaleCollectionIdentifiers.includes(entreprisePlanSaleIdentifier)) {
          return false;
        }
        entreprisePlanSaleCollectionIdentifiers.push(entreprisePlanSaleIdentifier);
        return true;
      });
      return [...entreprisePlanSalesToAdd, ...entreprisePlanSaleCollection];
    }
    return entreprisePlanSaleCollection;
  }

  protected convertDateFromClient<T extends IEntreprisePlanSaleChad | NewEntreprisePlanSaleChad | PartialUpdateEntreprisePlanSaleChad>(
    entreprisePlanSale: T
  ): RestOf<T> {
    return {
      ...entreprisePlanSale,
      startDate: entreprisePlanSale.startDate?.toJSON() ?? null,
      expirateDate: entreprisePlanSale.expirateDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restEntreprisePlanSaleChad: RestEntreprisePlanSaleChad): IEntreprisePlanSaleChad {
    return {
      ...restEntreprisePlanSaleChad,
      startDate: restEntreprisePlanSaleChad.startDate ? dayjs(restEntreprisePlanSaleChad.startDate) : undefined,
      expirateDate: restEntreprisePlanSaleChad.expirateDate ? dayjs(restEntreprisePlanSaleChad.expirateDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestEntreprisePlanSaleChad>): HttpResponse<IEntreprisePlanSaleChad> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestEntreprisePlanSaleChad[]>): HttpResponse<IEntreprisePlanSaleChad[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
