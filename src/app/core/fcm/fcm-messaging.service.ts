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

@Injectable({providedIn: 'root'})
export class FcmMessagingService {
  // @ts-ignore
  private tokenSubscription: Subscription;

  currentMessage = new BehaviorSubject(null);

  tokenChanges(): Observable<string | null> {
    return this.fireMessaging.tokenChanges;
  }

  constructor(private fireMessaging: AngularFireMessaging, private remoteConfigService: RemoteConfigService) {
  }

  requestPermission(): Observable<NotificationPermission> {
    return this.fireMessaging.requestPermission;
  }

  init() {
    // console.log('FcmMessagingService > init')
    // const serviceWorkerRegistration = await navigator
    //   .serviceWorker
    //   .register('/firebase-massaging-sw.js');
    //
    // console.log('produce ', serviceWorkerRegistration);

    this.tokenSubscription = this.fireMessaging.getToken.subscribe(value => {
      console.log('fcm token > ', value)
    });


    this.fireMessaging.messages.subscribe(nextMessage => {
      console.log('fcm > message', nextMessage, nextMessage.data);
    });

    this.fireMessaging.requestPermission.subscribe(permission => {
      console.log('fcm permission > ', permission);
    });
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }
}
