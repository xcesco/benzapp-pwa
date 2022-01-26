import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TesseraComponent} from '../list/tessera.component';
import {TesseraDetailComponent} from '../detail/tessera-detail.component';
import {TesseraRoutingResolveService} from './tessera-routing-resolve.service';
import {UserRouteAccessService} from "../../../core/auth/user-route-access.service";
import {TesseraQrcodeComponent} from "../qrcode/tessera-qrcode.component";
import {DelegaRoutingResolveService} from "./delega-routing-resolve.service";

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
  },
  {
    path: ':id/qrcode',
    component: TesseraQrcodeComponent,
    resolve: {
      tessera: TesseraRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/qrcode-delega',
    component: TesseraQrcodeComponent,
    resolve: {
      tessera: DelegaRoutingResolveService,
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
