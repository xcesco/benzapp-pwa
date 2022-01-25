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
    protected stazioneService: StazioneService,
    protected modalService: NgbModal
  ) {
    this.activatedRoute.data.subscribe(({ stazioni }) => {
      this.stazioni = stazioni;
      console.log(stazioni)
    });
  }

  ngOnInit(): void {
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

  onNavigate(stazione: IStazione) {
    this.stazioneService.navigateTo(stazione);
  }
}
