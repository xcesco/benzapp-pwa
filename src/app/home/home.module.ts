import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import {SharedModule} from "../shared/shared.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE]), MatTabsModule, MatIconModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
