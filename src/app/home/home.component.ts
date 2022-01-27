import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Account} from "../core/auth/account.model";
import {AccountService} from "../core/auth/account.service";
import {RemoteConfigService} from "../core/config/remote-config.service";
import {FcmMessagingService} from "../core/fcm/fcm-messaging.service";
import {mergeMapTo} from 'rxjs/operators';
import {NgxQrcodeElementTypes} from "@techiediaries/ngx-qrcode";


@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  baseUrl: string;
  elementType = NgxQrcodeElementTypes.URL;

  constructor(private accountService: AccountService, private router: Router, public remoteConfigService: RemoteConfigService, public fcmMessagingService: FcmMessagingService) {
    remoteConfigService.init();
    fcmMessagingService.init();
    this.baseUrl=window.location.href;
  }

  requestPermission() {
    this.remoteConfigService.init();

    this.fcmMessagingService.requestPermission()
      .pipe(mergeMapTo(this.fcmMessagingService.tokenChanges()))
      .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token);
        },
        (error) => {
          console.error(error);
        },
      );
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
