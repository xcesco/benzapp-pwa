import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {IStazione} from "../stazione.model";
import {StazioneService} from "../service/stazione.service";


@Injectable({providedIn: 'root'})
export class StazioneListRoutingResolveService implements Resolve<IStazione[]> {
  constructor(private service: StazioneService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IStazione[]> {
    //return this.service.findAll();
    // return new Observable<IStazione[]>((observer) => {
    //   observer.next([]);
    // })

    return of(this.service.findAll());
  }
}
