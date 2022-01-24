import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from './user.model';
import {Pagination} from "../../core/request/request.model";
import {createRequestOption} from "../../core/request/request-util";
import {RemoteConfigService} from "../../core/config/remote-config.service";

@Injectable({ providedIn: 'root' })
export class UserService {
  get resourceUrl(): string {
    return this.remoteConfigService.backendBaseUrl + 'api/users';
  }

  constructor(private http: HttpClient, private remoteConfigService:RemoteConfigService) {}

  query(req?: Pagination): Observable<HttpResponse<IUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
