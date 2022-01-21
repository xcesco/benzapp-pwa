import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CittadinoComponent } from '../list/cittadino.component';
import { CittadinoDetailComponent } from '../detail/cittadino-detail.component';
import { CittadinoUpdateComponent } from '../update/cittadino-update.component';
import { CittadinoRoutingResolveService } from './cittadino-routing-resolve.service';
import {UserRouteAccessService} from "../../../core/auth/user-route-access.service";

const cittadinoRoute: Routes = [
  {
    path: '',
    component: CittadinoComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CittadinoDetailComponent,
    resolve: {
      cittadino: CittadinoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CittadinoUpdateComponent,
    resolve: {
      cittadino: CittadinoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CittadinoUpdateComponent,
    resolve: {
      cittadino: CittadinoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cittadinoRoute)],
  exports: [RouterModule],
})
export class CittadinoRoutingModule {}
