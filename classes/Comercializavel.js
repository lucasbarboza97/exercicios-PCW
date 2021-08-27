/**  Imports
 * 
 * 
 * @author Lucas Barboza
*/
import { DominioException }  from "./DominioException.js";
// import { ItemVenda }  from "./ItemVenda.js";

export class Comercializavel {
    
    _codigo = '';
    _descricao = '';
    _preco = '';

    constructor (codigo,descricao,preco) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.preco = preco;
        if (this.constructor === Comercializavel){
            throw new DominioException ("Não é possível instanciar comercializável.");
        }
    }

    get codigo () {return this._codigo};
    set codigo (codigo){
        this._codigo = codigo
    };

    get descricao () {return this._descricao};
    set descricao (descricao){this._descricao = descricao};

    get preco () {return this._preco};
    set preco (preco){this._preco = preco};
}

export default {
    Comercializavel
}