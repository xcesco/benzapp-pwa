import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import {Login} from "../../login/login.model";
import {RemoteConfigService} from "../config/remote-config.service";
import {Device} from "../../entities/device/device.model";
import {DeviceService} from "../../entities/device/service/device.service";
import {AccountService} from "./account.service";


type JwtToken = {
  id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService,
              private apiClientService:RemoteConfigService, private deviceService: DeviceService, private accountService: AccountService) {}

  getToken(): string {
    const tokenInLocalStorage: string | null = this.$localStorage.retrieve('authenticationToken');
    const tokenInSessionStorage: string | null = this.$sessionStorage.retrieve('authenticationToken');
    return tokenInLocalStorage ?? tokenInSessionStorage ?? '';
  }

  login(credentials: Login): Observable<void> {
    console.log(this.apiClientService.backendBaseUrl + 'api/authenticate');
    return this.http
      .post<JwtToken>(this.apiClientService.backendBaseUrl + 'api/authenticate', credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.id_token;
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt);
      this.$sessionStorage.clear('authenticationToken');
    } else {
      this.$sessionStorage.store('authenticationToken', jwt);
      this.$localStorage.clear('authenticationToken');
    }

    const accountService=this.accountService.identity(true).subscribe(account => {
      const fcmToken=this.$localStorage.retrieve('fcmToken');
      const device: Device = {owner: account?.login, deviceId: fcmToken};
      this.deviceService.create(device).subscribe(()=> console.log('device registered!'));
    });


  }
}
