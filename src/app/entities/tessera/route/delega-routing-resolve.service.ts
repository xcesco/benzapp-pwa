import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITessera, Tessera } from '../tessera.model';
import { TesseraService } from '../service/tessera.service';
import {DelegaService} from "../../delega/service/delega.service";
import {IDelega} from "../../delega/delega.model";

@Injectable({ providedIn: 'root' })
export class DelegaRoutingResolveService implements Resolve<ITessera> {
  constructor(private service: DelegaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITessera> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((delega: HttpResponse<IDelega>) => {
          if (delega.body) {
            return of(delega.body.tessera!);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tessera());
  }
}
