import {ICittadino} from "../cittadino/cittadino.model";
import {ITessera} from "../tessera/tessera.model";

export interface IDelega {
  id?: number;
  cittadino?: ICittadino | null;
  tessera?: ITessera | null;
}

export class Delega implements IDelega {
  constructor(public id?: number, public cittadino?: ICittadino | null, public tessera?: ITessera | null) {}
}
