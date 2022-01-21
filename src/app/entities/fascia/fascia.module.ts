import {NgModule} from '@angular/core';

import {FasciaComponent} from './list/fascia.component';
import {FasciaDetailComponent} from './detail/fascia-detail.component';
import {FasciaUpdateComponent} from './update/fascia-update.component';
import {FasciaDeleteDialogComponent} from './delete/fascia-delete-dialog.component';
import {FasciaRoutingModule} from './route/fascia-routing.module';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [SharedModule, FasciaRoutingModule],
  declarations: [FasciaComponent, FasciaDetailComponent, FasciaUpdateComponent, FasciaDeleteDialogComponent],
  entryComponents: [FasciaDeleteDialogComponent],
})
export class FasciaModule {
}
