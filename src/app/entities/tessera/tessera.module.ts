import { NgModule } from '@angular/core';

import {SharedModule} from "../../shared/shared.module";
import { TesseraComponent } from './list/tessera.component';
import { TesseraDetailComponent } from './detail/tessera-detail.component';
import { TesseraDeleteDialogComponent } from './delete/tessera-delete-dialog.component';
import { TesseraRoutingModule } from './route/tessera-routing.module';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
    imports: [SharedModule, TesseraRoutingModule, MatIconModule],
  declarations: [TesseraComponent, TesseraDetailComponent, TesseraDeleteDialogComponent],
  entryComponents: [TesseraDeleteDialogComponent],
})
export class TesseraModule {}
