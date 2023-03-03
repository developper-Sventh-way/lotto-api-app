import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDayTirageChad, NewDayTirageChad } from '../day-tirage-chad.model';

export type PartialUpdateDayTirageChad = Partial<IDayTirageChad> & Pick<IDayTirageChad, 'id'>;

type RestOf<T extends IDayTirageChad | NewDayTirageChad> = Omit<T, 'dateTransaction'> & {
  dateTransaction?: string | null;
};

export type RestDayTirageChad = RestOf<IDayTirageChad>;

export type NewRestDayTirageChad = RestOf<NewDayTirageChad>;

export type PartialUpdateRestDayTirageChad = RestOf<PartialUpdateDayTirageChad>;

export type EntityResponseType = HttpResponse<IDayTirageChad>;
export type EntityArrayResponseType = HttpResponse<IDayTirageChad[]>;

@Injectable({ providedIn: 'root' })
export class DayTirageChadService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/day-tirages');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(dayTirage: NewDayTirageChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dayTirage);
    return this.http
      .post<RestDayTirageChad>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(dayTirage: IDayTirageChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dayTirage);
    return this.http
      .put<RestDayTirageChad>(`${this.resourceUrl}/${this.getDayTirageChadIdentifier(dayTirage)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(dayTirage: PartialUpdateDayTirageChad): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dayTirage);
    return this.http
      .patch<RestDayTirageChad>(`${this.resourceUrl}/${this.getDayTirageChadIdentifier(dayTirage)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestDayTirageChad>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestDayTirageChad[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getDayTirageChadIdentifier(dayTirage: Pick<IDayTirageChad, 'id'>): number {
    return dayTirage.id;
  }

  compareDayTirageChad(o1: Pick<IDayTirageChad, 'id'> | null, o2: Pick<IDayTirageChad, 'id'> | null): boolean {
    return o1 && o2 ? this.getDayTirageChadIdentifier(o1) === this.getDayTirageChadIdentifier(o2) : o1 === o2;
  }

  addDayTirageChadToCollectionIfMissing<Type extends Pick<IDayTirageChad, 'id'>>(
    dayTirageCollection: Type[],
    ...dayTiragesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const dayTirages: Type[] = dayTiragesToCheck.filter(isPresent);
    if (dayTirages.length > 0) {
      const dayTirageCollectionIdentifiers = dayTirageCollection.map(dayTirageItem => this.getDayTirageChadIdentifier(dayTirageItem)!);
      const dayTiragesToAdd = dayTirages.filter(dayTirageItem => {
        const dayTirageIdentifier = this.getDayTirageChadIdentifier(dayTirageItem);
        if (dayTirageCollectionIdentifiers.includes(dayTirageIdentifier)) {
          return false;
        }
        dayTirageCollectionIdentifiers.push(dayTirageIdentifier);
        return true;
      });
      return [...dayTiragesToAdd, ...dayTirageCollection];
    }
    return dayTirageCollection;
  }

  protected convertDateFromClient<T extends IDayTirageChad | NewDayTirageChad | PartialUpdateDayTirageChad>(dayTirage: T): RestOf<T> {
    return {
      ...dayTirage,
      dateTransaction: dayTirage.dateTransaction?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restDayTirageChad: RestDayTirageChad): IDayTirageChad {
    return {
      ...restDayTirageChad,
      dateTransaction: restDayTirageChad.dateTransaction ? dayjs(restDayTirageChad.dateTransaction) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestDayTirageChad>): HttpResponse<IDayTirageChad> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestDayTirageChad[]>): HttpResponse<IDayTirageChad[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
