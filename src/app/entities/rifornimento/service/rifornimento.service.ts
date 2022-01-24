import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { IRifornimento } from '../rifornimento.model';
import {createRequestOption} from "../../../core/request/request-util";
import {RemoteConfigService} from "../../../core/config/remote-config.service";

type EntityResponseType = HttpResponse<IRifornimento>;
type EntityArrayResponseType = HttpResponse<IRifornimento[]>;

@Injectable({ providedIn: 'root' })
export class RifornimentoService {
  get resourceUrl(): string {
    return this.remoteConfigService.backendBaseUrl + 'api/rifornimentos';
  }

  constructor(protected http: HttpClient, private remoteConfigService:RemoteConfigService) {}

  create(rifornimento: IRifornimento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rifornimento);
    return this.http
      .post<IRifornimento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(rifornimento: IRifornimento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rifornimento);
    return this.http
      .put<IRifornimento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRifornimento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRifornimento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(rifornimento: IRifornimento): IRifornimento {
    const copy: IRifornimento = Object.assign({}, rifornimento, {
      data: rifornimento.data?.isValid() ? rifornimento.data.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.data = res.body.data ? dayjs(res.body.data) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((rifornimento: IRifornimento) => {
        rifornimento.data = rifornimento.data ? dayjs(rifornimento.data) : undefined;
      });
    }
    return res;
  }
}
