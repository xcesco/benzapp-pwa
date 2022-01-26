import { NgModule } from '@angular/core';

import {SharedModule} from "../../shared/shared.module";
import { TesseraComponent } from './list/tessera.component';
import { TesseraDetailComponent } from './detail/tessera-detail.component';
import { TesseraDeleteDialogComponent } from './delete/tessera-delete-dialog.component';
import { TesseraRoutingModule } from './route/tessera-routing.module';
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {TesseraQrcodeComponent} from "./qrcode/tessera-qrcode.component";
import {NgxQRCodeModule} from "@techiediaries/ngx-qrcode";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [SharedModule, TesseraRoutingModule, MatIconModule, MatListModule, MatButtonModule, MatChipsModule, MatFormFieldModule, MatInputModule, NgxQRCodeModule, FlexLayoutModule],
  declarations: [TesseraComponent, TesseraDetailComponent, TesseraDeleteDialogComponent, TesseraQrcodeComponent],
  entryComponents: [TesseraDeleteDialogComponent],
})
export class TesseraModule {}
