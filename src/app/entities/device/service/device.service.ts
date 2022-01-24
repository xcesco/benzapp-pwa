import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IDevice} from '../device.model';
import {RemoteConfigService} from "../../../core/config/remote-config.service";
import {createRequestOption} from "../../../core/request/request-util";

type EntityResponseType = HttpResponse<IDevice>;
type EntityArrayResponseType = HttpResponse<IDevice[]>;

@Injectable({providedIn: 'root'})
export class DeviceService {
  get resourceUrl(): string {
    return this.remoteConfigService.backendBaseUrl + 'api/devices'
  };

  constructor(protected http: HttpClient, private remoteConfigService: RemoteConfigService) {
  }

  create(device: IDevice): Observable<EntityResponseType> {
    return this.http.post<IDevice>(this.resourceUrl, device, {observe: 'response'});
  }

  update(device: IDevice): Observable<EntityResponseType> {
    return this.http.put<IDevice>(this.resourceUrl, device, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDevice>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDevice[]>(this.resourceUrl, {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }
}
