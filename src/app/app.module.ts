import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LockScreenComponent} from './lock-screen/lock-screen.component';
import {SharedModule} from "./shared/shared.module";
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgxWebstorageModule} from "ngx-webstorage";
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {missingTranslationHandler, translatePartialLoader} from "./config/translation.config";
import {NgbDateAdapter, NgbDatepickerConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as dayjs from "dayjs";
import {locale} from "dayjs";
import {fontAwesomeIcons} from "./config/font-awesome-icons";
import {NgbDateDayjsAdapter} from "./config/datepicker-adapter";
import {httpInterceptorProviders} from "./core/interceptor";
import {MainComponent} from "./layouts/main/main.component";
import {ActiveMenuDirective} from "./layouts/navbar/active-menu.directive";
import {PageRibbonComponent} from "./layouts/profiles/page-ribbon.component";
import {NavbarComponent} from "./layouts/navbar/navbar.component";
import {FooterComponent} from "./layouts/footer/footer.component";
import {ErrorComponent} from "./layouts/error/error.component";

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FontAwesomeModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot({prefix: 'jhi', separator: '-'}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translatePartialLoader,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useFactory: missingTranslationHandler,
      },
    }),
    NgbModule,
  ],
  providers: [
    Title,
    {provide: LOCALE_ID, useValue: 'it'},
    {provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter},
    httpInterceptorProviders,
  ],
  declarations: [AppComponent, LockScreenComponent, MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig, translateService: TranslateService) {
    // registerLocaleData(locale);
    console.log('ss', locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = {year: dayjs().subtract(100, 'year').year(), month: 1, day: 1};
    translateService.setDefaultLang('it');
    translateService.use('it');
  }
}
