import {NgModule} from '@angular/core';

import {DelegaComponent} from './list/delega.component';
import {DelegaDetailComponent} from './detail/delega-detail.component';
import {DelegaUpdateComponent} from './update/delega-update.component';
import {DelegaDeleteDialogComponent} from './delete/delega-delete-dialog.component';
import {DelegaRoutingModule} from './route/delega-routing.module';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [SharedModule, DelegaRoutingModule],
  declarations: [DelegaComponent, DelegaDetailComponent, DelegaUpdateComponent, DelegaDeleteDialogComponent],
  entryComponents: [DelegaDeleteDialogComponent],
  exports: [DelegaComponent],
})
export class DelegaModule {
}
