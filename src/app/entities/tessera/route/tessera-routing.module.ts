import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TesseraComponent} from '../list/tessera.component';
import {TesseraDetailComponent} from '../detail/tessera-detail.component';
import {TesseraRoutingResolveService} from './tessera-routing-resolve.service';
import {UserRouteAccessService} from "../../../core/auth/user-route-access.service";

const tesseraRoute: Routes = [
  {
    path: '',
    component: TesseraComponent,
    data: {
      defaultSort: 'targa,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TesseraDetailComponent,
    resolve: {
      tessera: TesseraRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(tesseraRoute)],
  exports: [RouterModule],
})
export class TesseraRoutingModule {
}
