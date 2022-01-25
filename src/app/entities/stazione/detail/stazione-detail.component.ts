import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IStazione} from "../stazione.model";


@Component({
  selector: 'jhi-rifornimento-detail',
  templateUrl: './stazione-detail.component.html',
})
export class StazioneDetailComponent implements OnInit {
  stazione: IStazione | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stazione }) => {
      this.stazione = stazione;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
