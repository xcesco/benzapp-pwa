import {NgModule} from '@angular/core';

import {SharedModule} from "../../shared/shared.module";
import {RifornimentoComponent} from './list/rifornimento.component';
import {RifornimentoDetailComponent} from './detail/rifornimento-detail.component';
import {RifornimentoDeleteDialogComponent} from './delete/rifornimento-delete-dialog.component';
import {RifornimentoRoutingModule} from './route/rifornimento-routing.module';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatListModule} from "@angular/material/list";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  imports: [SharedModule, RifornimentoRoutingModule, MatButtonModule, MatIconModule, FlexLayoutModule, MatListModule, MatChipsModule],
  declarations: [
    RifornimentoComponent,
    RifornimentoDetailComponent,
    RifornimentoDeleteDialogComponent,
  ],
  entryComponents: [RifornimentoDeleteDialogComponent],
})
export class RifornimentoModule {
}
