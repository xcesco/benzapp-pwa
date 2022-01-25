import {Injectable} from '@angular/core';
import {IStazione} from "../stazione.model";
import {stations} from "../stazione.data";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class StazioneService {
  constructor(private http: HttpClient) {
  }

  find(id: number): IStazione {
    return this.convert(stations.find(item => parseInt(item.id) === id));
  }

  findAll(): IStazione[] {
    return stations.map(item => this.convert(item));
  }

  protected convert(input: any): IStazione {
    const copy: IStazione = Object.assign({}, input, {
      id: parseInt(input['id']),
      marchioId: parseInt(input['marchio_id']),
      indirizzo: input['indirizzo'],
      lng: parseFloat(input['longitudine']),
      lat: parseFloat(input['latitudine']),
      tipo: input['tipo']
    });
    return copy;
  }

  navigateTo(stazione: IStazione) {
    const mapUrl = `http://maps.google.com/maps?z=12&t=m&q=loc:${stazione.lat}+${stazione.lng}`;
    window.open(mapUrl, "_blank");
  }
}
