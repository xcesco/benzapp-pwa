import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import {SharedModule} from "../shared/shared.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {NgxQRCodeModule} from "@techiediaries/ngx-qrcode";
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE]), MatTabsModule, MatIconModule, NgxQRCodeModule, MatCardModule, FlexLayoutModule, MatButtonModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
