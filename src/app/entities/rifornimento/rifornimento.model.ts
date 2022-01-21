import * as dayjs from 'dayjs';
import {TipoCarburante} from "../enumerations/tipo-carburante.model";
import {ITessera} from "../tessera/tessera.model";
import {IGestore} from "../gestore/gestore.model";
import {TipoVeicolo} from "../enumerations/tipo-veicolo.model";

export interface IRifornimento {
  id?: number;
  data?: dayjs.Dayjs;
  litriErogati?: number;
  sconto?: number;
  prezzoAlLitro?: number;
  tipoCarburante?: TipoCarburante;
  gestore?: IGestore | null;
  tessera?: ITessera | null;
}

export class Rifornimento implements IRifornimento {
  constructor(
    public id?: number,
    public data?: dayjs.Dayjs,
    public litriErogati?: number,
    public sconto?: number,
    public prezzoAlLitro?: number,
    public tipoCarburante?: TipoCarburante,
    public gestore?: IGestore | null,
    public tessera?: ITessera | null
  ) {
  }
}

export interface IQRCode {
  tesseraNumero: string;
  codiceFiscale: string;
  targa: string;
  veicolo: TipoVeicolo;
  carburante: TipoCarburante;
}

export enum QRReaderStatus {
  INACTIVE,
  READY,
  RUNNING,
  FINISHED,
}
