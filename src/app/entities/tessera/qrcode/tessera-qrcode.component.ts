import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ITessera} from '../tessera.model';
import {DataUtils} from "../../../core/util/data-util.service";
import {NgxQrcodeElementTypes, QrcodeComponent} from "@techiediaries/ngx-qrcode";
import {NgxQrcodeErrorCorrectionLevels} from "@techiediaries/ngx-qrcode/lib/qrcode.types";
import html2canvas from "html2canvas";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) {
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

      this.value = JSON.stringify(qrCodeInfo);
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

  share(qrcode: QrcodeComponent) {
      this.shareInternatl(qrcode).then(()=> console.log('eseguito'));
  }

  //https://stackoverflow.com/questions/68362603/share-image-via-social-media-from-pwa
  async shareInternatl(qrcode: QrcodeComponent): Promise<void> {
    if (!('share' in navigator)) {
      this.snackBar.open('Web Share API non supportate!', '', {duration: 5000});
      return
    }
    // `element` is the HTML element you want to share.
    // `backgroundColor` is the desired background color.
    const canvas = await html2canvas(qrcode.qrcElement.nativeElement)
    canvas.toBlob(async (blob) => {
      // Even if you want to share just one file you need to
      // send them as an array of files.
      // @ts-ignore
      const files = [new File([blob], 'image.png', {type: blob.type})]
      const shareData = {
        text: 'Some text',
        title: 'Some title',
        files,
      }
      if (navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData)
        } catch (err) {
          // @ts-ignore
          if (err.name !== 'AbortError') {
            // @ts-ignore
            console.error(err.name, err.message)
          }
        }
      } else {
        console.warn('Sharing not supported', shareData)
      }
    })
  }
}
