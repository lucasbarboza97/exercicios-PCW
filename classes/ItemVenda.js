import { DominioException } from "./DominioException.js";
import { Comercializavel } from "./Comercializavel.js";

export class ItemVenda {
    
    _quantidade = 0;

    constructor (quantidade){
        this.quantidade = quantidade;
    }

    subtotal (preco) {
        return this._quantidade * preco;
    }

    get quantidade () {return this._quantidade};
    set quantidade (quantidade){
        if(quantidade<1){
            throw new DominioException ("Deve ter no mínimo 1 item para a venda.");
        }
        this._quantidade = quantidade
    };
}


export default {
    ItemVenda
}