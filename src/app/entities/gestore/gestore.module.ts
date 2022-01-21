import { NgModule } from '@angular/core';

import { GestoreComponent } from './list/gestore.component';
import { GestoreDetailComponent } from './detail/gestore-detail.component';
import { GestoreUpdateComponent } from './update/gestore-update.component';
import { GestoreDeleteDialogComponent } from './delete/gestore-delete-dialog.component';
import { GestoreRoutingModule } from './route/gestore-routing.module';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [SharedModule, GestoreRoutingModule],
  declarations: [GestoreComponent, GestoreDetailComponent, GestoreUpdateComponent, GestoreDeleteDialogComponent],
  entryComponents: [GestoreDeleteDialogComponent],
})
export class GestoreModule {}
