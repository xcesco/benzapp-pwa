import {Component, OnInit} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ITEMS_PER_PAGE} from "../../../config/pagination.constants";
import {IRifornimento} from "../../rifornimento/rifornimento.model";
import {IStazione} from "../stazione.model";
import {StazioneService} from "../service/stazione.service";

@Component({
  selector: 'jhi-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  zoom = 12;
  center: google.maps.LatLngLiteral = {lat: 0, lng: 0};
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  stazioni?: IStazione[];

  constructor(
    protected rifornimentoService: StazioneService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {
    this.activatedRoute.data.subscribe(({stazioni}) => {
      this.stazioni = stazioni;
    });
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  zoomIn() {
    // @ts-ignore
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    // @ts-ignore
    if (this.zoom > this.options.minZoom) this.zoom--
  }
}
