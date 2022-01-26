import {NgModule} from '@angular/core';

import {SharedModule} from "../../shared/shared.module";
import {StazioneRoutingModule} from "./route/stazione-routing.module";
import {StazioneComponent} from "./list/stazione.component";
import {StazioneDetailComponent} from "./detail/stazione-detail.component";
import {MapComponent} from "./map/map.component";
import {GoogleMapsModule, MapMarkerClusterer} from '@angular/google-maps'
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    imports: [SharedModule, StazioneRoutingModule, GoogleMapsModule, MatIconModule, MatListModule, MatButtonModule, FlexLayoutModule],
  declarations: [
    StazioneComponent,
    StazioneDetailComponent,
    MapComponent,
  ],
  entryComponents: []
})
export class StazioneModule {
}
