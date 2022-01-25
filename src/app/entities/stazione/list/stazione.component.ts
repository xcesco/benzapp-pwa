import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IStazione} from "../stazione.model";
import {StazioneService} from "../service/stazione.service";

@Component({
  selector: 'jhi-stazione',
  templateUrl: './stazione.component.html',
})
export class StazioneComponent implements OnInit {
  stazioni?: IStazione[];

  constructor(
    protected rifornimentoService: StazioneService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {
    this.activatedRoute.data.subscribe(({ stazioni }) => {
      this.stazioni = stazioni;
      console.log(stazioni)
    });
  }

  ngOnInit(): void {
  }
}
