import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SessionStorageService} from 'ngx-webstorage';
import {LANGUAGES} from "../../config/language.constants";
import {Account} from "../../core/auth/account.model";
import {LoginService} from "../../login/login.service";
import {AccountService} from "../../core/auth/account.service";
import {ProfileService} from "../profiles/profile.service";
import {GestoreService} from "../../entities/gestore/service/gestore.service";
import {CittadinoService} from "../../entities/cittadino/service/cittadino.service";
import {VERSION} from "../../app.constants";

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  account: Account | null = null;
  accountAuthenticated = false;

  gestoreId: number | undefined | null = null;
  userId: number | undefined | null = null;

  version: string;

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorage: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private gestoreService: GestoreService,
    private cittadinoService: CittadinoService,
    private router: Router
  ) {
    this.version = VERSION ? (VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION) : '';
  }

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.accountAuthenticated = true;
      this.userId = null;
      this.gestoreId = null;

      if (account != null) {
        if (this.hasAuthority(['ROLE_PATROL_STATION'])) {
          this.gestoreService.queryByOwner(account.login).subscribe(value => {
            this.gestoreId = value.body?.[0]?.id;
            this.account = account;
            this.accountAuthenticated = true;
          });
        } else if (this.hasAuthority(['ROLE_USER'])) {
          this.cittadinoService.queryByOwner(account.login).subscribe(value => {
            this.userId = value.body?.[0]?.id;
            this.account = account;
            this.accountAuthenticated = true;
          });
        } else {
          this.account = account;
          this.accountAuthenticated = true;
        }
      } else {
        this.account = null;
        this.accountAuthenticated = false;
      }
    });
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorage.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl(): string {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : '';
  }

  hasAuthority(authorities: string[]): boolean {
    return this.accountService.hasAnyAuthority(authorities);
  }
}
