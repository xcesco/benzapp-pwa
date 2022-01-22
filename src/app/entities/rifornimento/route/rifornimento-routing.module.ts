import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RifornimentoComponent } from '../list/rifornimento.component';
import { RifornimentoDetailComponent } from '../detail/rifornimento-detail.component';
import { RifornimentoRoutingResolveService } from './rifornimento-routing-resolve.service';
import {UserRouteAccessService} from "../../../core/auth/user-route-access.service";

const rifornimentoRoute: Routes = [
  {
    path: '',
    component: RifornimentoComponent,
    data: {
      defaultSort: 'data,desc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RifornimentoDetailComponent,
    resolve: {
      rifornimento: RifornimentoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(rifornimentoRoute)],
  exports: [RouterModule],
})
export class RifornimentoRoutingModule {}
