import {NgModule} from '@angular/core';

import {SharedModule} from "../../shared/shared.module";
import {StazioneRoutingModule} from "./route/stazione-routing.module";
import {StazioneComponent} from "./list/stazione.component";
import {StazioneDetailComponent} from "./detail/stazione-detail.component";
import {MapComponent} from "./map/map.component";
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  imports: [SharedModule, StazioneRoutingModule, GoogleMapsModule],
  declarations: [
    StazioneComponent,
    StazioneDetailComponent,
    MapComponent
  ],
  entryComponents: []
})
export class StazioneModule {
}
