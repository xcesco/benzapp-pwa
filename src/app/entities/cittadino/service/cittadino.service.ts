import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {ICittadino} from '../cittadino.model';
import {createRequestOption} from "../../../core/request/request-util";
import {RemoteConfigService} from "../../../core/config/remote-config.service";

type EntityResponseType = HttpResponse<ICittadino>;
type EntityArrayResponseType = HttpResponse<ICittadino[]>;

@Injectable({providedIn: 'root'})
export class CittadinoService {
  get resourceUrl(): string {
    return this.remoteConfigService.backendBaseUrl + 'api/cittadinos';
  }

  constructor(protected http: HttpClient, private remoteConfigService: RemoteConfigService) {
  }

  create(cittadino: ICittadino): Observable<EntityResponseType> {
    return this.http.post<ICittadino>(this.resourceUrl, cittadino, {observe: 'response'});
  }

  update(cittadino: ICittadino): Observable<EntityResponseType> {
    return this.http.put<ICittadino>(this.resourceUrl, cittadino, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICittadino>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  queryByOwner(owner: string): Observable<EntityArrayResponseType> {
    return this.http.get<ICittadino[]>(`${this.resourceUrl}/?owner.equals=${owner}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICittadino[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }
}
