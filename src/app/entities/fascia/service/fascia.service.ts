import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFascia } from '../fascia.model';
import {createRequestOption} from "../../../core/request/request-util";
import {RemoteConfigService} from "../../../core/config/remote-config.service";

type EntityResponseType = HttpResponse<IFascia>;
type EntityArrayResponseType = HttpResponse<IFascia[]>;

@Injectable({ providedIn: 'root' })
export class FasciaService {
  get resourceUrl(): string {
    return this.remoteConfigService.backendBaseUrl + 'api/fascias';
  }

  constructor(protected http: HttpClient, private remoteConfigService:RemoteConfigService) {}

  create(fascia: IFascia): Observable<EntityResponseType> {
    return this.http.post<IFascia>(this.resourceUrl, fascia, { observe: 'response' });
  }

  update(fascia: IFascia): Observable<EntityResponseType> {
    return this.http.put<IFascia>(this.resourceUrl, fascia, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFascia>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFascia[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
