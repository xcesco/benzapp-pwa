import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LOGIN_ROUTE } from './login.route';
import { LoginComponent } from './login.component';
import {SharedModule} from "../shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [SharedModule, RouterModule.forChild([LOGIN_ROUTE]), MatCardModule, FlexLayoutModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
