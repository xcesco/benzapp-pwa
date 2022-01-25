import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserRouteAccessService} from "../../../core/auth/user-route-access.service";
import {StazioneComponent} from "../list/stazione.component";
import {StazioneDetailComponent} from "../detail/stazione-detail.component";
import {StazioneRoutingResolveService} from "./stazione-routing-resolve.service";
import {MapComponent} from "../map/map.component";
import {StazioneListRoutingResolveService} from "./stazione-list-routing-resolve.service";

const stazioneRoute: Routes = [
  {
    path: '',
    component: StazioneComponent,
    resolve: {
      stazioni: StazioneListRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'map',
    component: MapComponent,
    resolve: {
      stazioni: StazioneListRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StazioneDetailComponent,
    resolve: {
      stazione: StazioneRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(stazioneRoute)],
  exports: [RouterModule],
})
export class StazioneRoutingModule {
}
