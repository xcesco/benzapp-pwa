import {Injectable} from "@angular/core";
import {AccountService} from "../auth/account.service";
import {AuthServerProvider} from "../auth/auth-jwt.service";
import {Login} from "../../login/login.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Account} from "../auth/account.model";
import {mergeMap} from "rxjs/operators";
import {AngularFireRemoteConfig} from "@angular/fire/compat/remote-config";
import {environment} from "../../../environments/environment";
import {AngularFireMessaging, AngularFireMessagingModule} from "@angular/fire/compat/messaging";
import {RemoteConfigService} from "../config/remote-config.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RifornimentoService} from "../../entities/rifornimento/service/rifornimento.service";

@Injectable({providedIn: 'root'})
export class FcmMessagingService {
  // @ts-ignore
  private tokenSubscription: Subscription;

  currentMessage = new BehaviorSubject(null);
  token: string | null = null;

  tokenChanges(): Observable<string | null> {
    return this.fireMessaging.tokenChanges;
  }

  constructor(private fireMessaging: AngularFireMessaging, private remoteConfigService: RemoteConfigService, private $localStorage: LocalStorageService, private snackBar: MatSnackBar, private rifornimentoService: RifornimentoService) {
  }

  requestPermission(): Observable<NotificationPermission> {
    return this.fireMessaging.requestPermission;
  }

  init() {
    console.log('fcm > registro listener');
    this.tokenSubscription = this.fireMessaging.getToken.subscribe(value => {
      console.log('fcm token > ', value)
      this.token = value;
      this.$localStorage.store('fcmToken', this.token);
      this.snackBar.open('Registrato FCM token'+this.token, '',{
        duration: 5000,
      });
    });

    this.fireMessaging.messages.subscribe(nextMessage => {

      console.log('fcm > message', nextMessage);

      // @ts-ignore
      const message = nextMessage.notification.body;

      // @ts-ignore
      this.snackBar.open(message, '',{
        duration: 5000,
      });
    });

    this.fireMessaging.requestPermission.subscribe(permission => {
      console.log('fcm permission > ', permission);
    });
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }
}
