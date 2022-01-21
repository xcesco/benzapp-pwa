import * as dayjs from 'dayjs';
import {TipoVeicolo} from "../enumerations/tipo-veicolo.model";
import {IDelega} from "../delega/delega.model";
import {IRifornimento} from "../rifornimento/rifornimento.model";
import {TipoCarburante} from "../enumerations/tipo-carburante.model";
import {ICittadino} from "../cittadino/cittadino.model";

export interface ITessera {
  id?: number;
  codice?: string;
  dataEmissione?: dayjs.Dayjs;
  immagineContentType?: string | null;
  immagine?: string | null;
  targa?: string;
  veicolo?: TipoVeicolo;
  carburante?: TipoCarburante;
  delegas?: IDelega[] | null;
  rifornimentos?: IRifornimento[] | null;
  cittadino?: ICittadino | null;
}

export class Tessera implements ITessera {
  constructor(
    public id?: number,
    public codice?: string,
    public dataEmissione?: dayjs.Dayjs,
    public immagineContentType?: string | null,
    public immagine?: string | null,
    public targa?: string,
    public veicolo?: TipoVeicolo,
    public carburante?: TipoCarburante,
    public delegas?: IDelega[] | null,
    public rifornimentos?: IRifornimento[] | null,
    public cittadino?: ICittadino | null
  ) {
  }
}
