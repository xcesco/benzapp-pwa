import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {ProfileInfo, InfoResponse} from './profile-info.model';
import {RemoteConfigService} from "../../core/config/remote-config.service";

@Injectable({providedIn: 'root'})
export class ProfileService {
  get infoUrl(): string {
    return this.remoteConfigService.backendBaseUrl + 'management/info';
  }

  private profileInfo$?: Observable<ProfileInfo>;

  constructor(private http: HttpClient, private remoteConfigService: RemoteConfigService) {
  }

  getProfileInfo(): Observable<ProfileInfo> {
    if (this.profileInfo$) {
      return this.profileInfo$;
    }

    this.profileInfo$ = this.http.get<InfoResponse>(this.infoUrl).pipe(
      map((response: InfoResponse) => {
        const profileInfo: ProfileInfo = {
          activeProfiles: response.activeProfiles,
          inProduction: response.activeProfiles?.includes('prod'),
          openAPIEnabled: response.activeProfiles?.includes('api-docs'),
        };
        if (response.activeProfiles && response['display-ribbon-on-profiles']) {
          const displayRibbonOnProfiles = response['display-ribbon-on-profiles'].split(',');
          const ribbonProfiles = displayRibbonOnProfiles.filter(profile => response.activeProfiles?.includes(profile));
          if (ribbonProfiles.length > 0) {
            profileInfo.ribbonEnv = ribbonProfiles[0];
          }
        }
        return profileInfo;
      }),
      shareReplay()
    );
    return this.profileInfo$;
  }
}
