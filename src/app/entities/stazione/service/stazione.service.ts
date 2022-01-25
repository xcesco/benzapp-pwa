import {Injectable} from '@angular/core';
import {IStazione} from "../stazione.model";
import {stations} from "../stazione.data";

@Injectable({providedIn: 'root'})
export class StazioneService {
  constructor() {
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
      longitudine: parseFloat(input['longitudine']),
      latitudine: parseFloat(input['latitudine']),
      tipo: input['tipo']
    });
    return copy;
  }
}
