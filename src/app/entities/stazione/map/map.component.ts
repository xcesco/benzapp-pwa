import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ITEMS_PER_PAGE} from "../../../config/pagination.constants";
import {IRifornimento} from "../../rifornimento/rifornimento.model";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import {IStazione} from "../stazione.model";
import {StazioneService} from "../service/stazione.service";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'jhi-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap, {static: false}) map: GoogleMap | undefined;

  zoom = 12;
  center: google.maps.LatLngLiteral = {lat: 45.796044, lng: 13.512454};
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  locations?: IStazione[];

  constructor(
    protected rifornimentoService: StazioneService,
    protected activatedRoute: ActivatedRoute,
    protected stazioneService: StazioneService,
    protected router: Router,
    protected modalService: NgbModal
  ) {
    this.activatedRoute.data.subscribe(({stazioni}) => {
      this.locations = stazioni;

// use default algorithm and renderer
      const markerCluster = new MarkerClusterer({ map: this.map!.googleMap });
    //  this.initMap();
    });
  }

  getMarchioImage(stazione:IStazione): string {
    switch (stazione.marchioId) {
      case 0: return '/assets/marchi/notDefined.jpg';
      case 1: return '/assets/marchi/eni.jpg';
      case 2: return '/assets/marchi/esso.jpg';
      case 3: return '/assets/marchi/kerotris.jpg';
      case 4: return '/assets/marchi/oilItalia.jpg';
      case 5: return '/assets/marchi/q8.jpg';
      case 6: return '/assets/marchi/tamoil.jpg';
    }
    return '/assets/marchi/notDefined.jpg';
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  initMap(): void {
    const infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    // Create an array of alphabetical characters used to label the markers.
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Add some markers to the map.
    const markers = this.locations!.map((position, i) => {
      const label = labels[i % labels.length];
      const marker = new google.maps.Marker({
        position,
        label,
      });

      // // markers can only be keyboard focusable when they have click listeners
      // // open info window when marker is clicked
      // marker.addListener("click", () => {
      //   infoWindow.setContent(label);
      //   infoWindow.open(this.map., marker);
      // });

      return marker;
    });

    // Add a marker clusterer to manage the markers.
    //new MarkerClusterer({markers, map});
  }

  public openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }

  zoomIn() {
    // @ts-ignore
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    // @ts-ignore
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  onClick(markerPosition: IStazione) {
    console.log('stazione', markerPosition);
  }

  onNavigate(stazione: IStazione) {
    this.stazioneService.navigateTo(stazione);
  }
}
