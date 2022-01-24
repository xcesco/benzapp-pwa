import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDelega } from '../delega.model';
import {createRequestOption} from "../../../core/request/request-util";
import {RemoteConfigService} from "../../../core/config/remote-config.service";

type EntityResponseType = HttpResponse<IDelega>;
type EntityArrayResponseType = HttpResponse<IDelega[]>;

@Injectable({ providedIn: 'root' })
export class DelegaService {
  get resourceUrl(): string {
    return this.remoteConfigService.backendBaseUrl + 'api/delegas';
  }

  constructor(protected http: HttpClient, private remoteConfigService:RemoteConfigService) {}

  create(delega: IDelega): Observable<EntityResponseType> {
    return this.http.post<IDelega>(this.resourceUrl, delega, { observe: 'response' });
  }

  update(delega: IDelega): Observable<EntityResponseType> {
    return this.http.put<IDelega>(this.resourceUrl, delega, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDelega>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDelega[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
