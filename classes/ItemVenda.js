import { DominioException } from "./DominioException.js";

/**
 * @function subtotal @returns @param {double} precoVenda Retorna o preço vezes a quantidade.
 * 
 * @setQuantidade verifica se a quantidade é maior que 0.
 * 
 * @param Comercializavel um objeto de serviço ou produto para pegar o preço e calcular o subtotal.
 */

export class ItemVenda {
    _quantidade = 0;
    _comercializavel = null;


    constructor (quantidade, comercializavel){
        this.quantidade = quantidade;
        this.comercializavel = comercializavel;
    }


    subtotal (){ 
        return this.comercializavel.preco * this.quantidade;
    };


    get comercializavel (){return this._comercializavel};
    set comercializavel (comercializavel){this._comercializavel = comercializavel};

    get quantidade () {return this._quantidade};
    set quantidade (quantidade){
        if(quantidade<1){
            throw new DominioException ("Deve ter no mínimo 1 item para a venda.");
        }
        this._quantidade = quantidade;
    };
}


export default {
    ItemVenda
}