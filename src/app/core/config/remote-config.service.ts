import {Injectable} from "@angular/core";
import {AngularFireRemoteConfig} from "@angular/fire/compat/remote-config";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class RemoteConfigService {
  private _backendBaseUrl: string = environment.SERVER_API_URL;

  get backendBaseUrl(): string {
    return this._backendBaseUrl;
  };

  async initializeRemoteConfig(): Promise<void> {
    await this.fireRemoteConfig.fetchAndActivate();

    await this.fireRemoteConfig.activate();

    this.fireRemoteConfig.getValue('backend_base_url').then(value => {
      this._backendBaseUrl = value.asString();
      console.log(`remote config > backendBaseUrl = ${this._backendBaseUrl} `);
    });


  }

  constructor(private fireRemoteConfig: AngularFireRemoteConfig) {
  }

  init() {
    this.initializeRemoteConfig().then(r => console.log('remote config > executed'));
  }
}
