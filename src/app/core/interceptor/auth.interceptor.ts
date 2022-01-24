import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {RemoteConfigService} from "../config/remote-config.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService, private sessionStorage: SessionStorageService, private remoteConfigService: RemoteConfigService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url || (request.url.startsWith('http') && !(this.remoteConfigService.backendBaseUrl && request.url.startsWith(this.remoteConfigService.backendBaseUrl)))) {
      return next.handle(request);
    }

    const token: string | null = this.localStorage.retrieve('authenticationToken') ?? this.sessionStorage.retrieve('authenticationToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
