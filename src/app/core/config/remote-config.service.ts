import {Injectable} from "@angular/core";
import {AngularFireRemoteConfig} from "@angular/fire/compat/remote-config";
import {environment} from "../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LocalStorageService} from "ngx-webstorage";

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
      this.$localStorage.store('backendBaseUrl', this._backendBaseUrl);
      console.log(`remote config > backendBaseUrl = ${this._backendBaseUrl} `);
    });
  }

  constructor(private fireRemoteConfig: AngularFireRemoteConfig, private snackBar: MatSnackBar, private $localStorage: LocalStorageService) {
    const value = $localStorage.retrieve('backendBaseUrl');
    if (value !== undefined && value !== null) {
      console.log('remote config > init ', value)
      this._backendBaseUrl = value;
    }
  }

  init(): void {
    this.initializeRemoteConfig().then(r => {
      console.log('remote config > executed', this._backendBaseUrl);
    });
  }
}
