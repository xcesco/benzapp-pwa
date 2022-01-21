import {NgModule} from '@angular/core';

import {SharedModule} from "../../shared/shared.module";
import {RifornimentoComponent} from './list/rifornimento.component';
import {RifornimentoDetailComponent} from './detail/rifornimento-detail.component';
import {RifornimentoUpdateComponent} from './update/rifornimento-update.component';
import {RifornimentoDeleteDialogComponent} from './delete/rifornimento-delete-dialog.component';
import {RifornimentoRoutingModule} from './route/rifornimento-routing.module';
import {ScannerComponent} from './update/scanner/scanner.component';
import {NumericKeysComponent} from './update/numeric-keys/numeric-keys.component';

@NgModule({
  imports: [SharedModule, RifornimentoRoutingModule],
  declarations: [
    RifornimentoComponent,
    RifornimentoDetailComponent,
    RifornimentoUpdateComponent,
    RifornimentoDeleteDialogComponent,
    ScannerComponent,
    NumericKeysComponent,
  ],
  entryComponents: [RifornimentoDeleteDialogComponent],
})
export class RifornimentoModule {
}
