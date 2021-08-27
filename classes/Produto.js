/**  Imports
 * 
 * 
 * @author Lucas Barboza
*/
import { Comercializavel } from "./Comercializavel.js";

export class Produto extends Comercializavel {
    
    _imagem = "";
    _estoque = 0;

    constructor (codigo, descricao, preco, imagem, estoque){
        super(codigo, descricao, preco);
        this.imagem = imagem;
        this.estoque = estoque;
    }

    get imagem () {return this._imagem};
    set imagem (imagem){this._imagem = imagem};

    get estoque () {return this._estoque};
    set estoque (estoque){this._estoque = estoque};

}

export default {
    Produto
}