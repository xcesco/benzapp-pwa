import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DelegaComponent } from '../list/delega.component';
import { DelegaDetailComponent } from '../detail/delega-detail.component';
import { DelegaUpdateComponent } from '../update/delega-update.component';
import { DelegaRoutingResolveService } from './delega-routing-resolve.service';
import {UserRouteAccessService} from "../../../core/auth/user-route-access.service";

const delegaRoute: Routes = [
  {
    path: '',
    component: DelegaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DelegaDetailComponent,
    resolve: {
      delega: DelegaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DelegaUpdateComponent,
    resolve: {
      delega: DelegaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DelegaUpdateComponent,
    resolve: {
      delega: DelegaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(delegaRoute)],
  exports: [RouterModule],
})
export class DelegaRoutingModule {}
