import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ITessera} from '../tessera.model';
import {DataUtils} from "../../../core/util/data-util.service";
import {NgxQrcodeElementTypes} from "@techiediaries/ngx-qrcode";
import {NgxQrcodeErrorCorrectionLevels} from "@techiediaries/ngx-qrcode/lib/qrcode.types";

@Component({
  selector: 'jhi-tessera-qrcode',
  templateUrl: './tessera-qrcode.component.html',
  styleUrls: ['./tessera-qrcode.component.scss'],
})
export class TesseraQrcodeComponent implements OnInit {
  title = 'app';
  elementType = NgxQrcodeElementTypes.URL;
  value = 'Techiediaries';

  tessera: ITessera | null = null;
  errorCorrectionLevel = 'M';

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({tessera}) => {
      this.tessera = tessera;

      const qrCodeInfo = {
        carburante: this.tessera?.carburante!,
        codiceFiscale: this.tessera?.cittadino?.codiceFiscale,
        targa: this.tessera?.targa,
        tesseraNumero: this.tessera?.codice,
        veicolo: this.tessera?.veicolo
      };

      this.value=JSON.stringify(qrCodeInfo);
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
