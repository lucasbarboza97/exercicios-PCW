/**  Imports
 * 
 * 
 * @author Lucas Barboza
*/
import { DominioException } from "./DominioException.js";


/**
 * @function addArray insere itens vendas, após clicar em adcionar, no @this arrayItemVenda.
 * @function subtotal Calcula a soma de todos os itens vendas adicionados e @returns {soma}
 * @function concederDesconto Aplica um desconto e salva em @this _descontoValor
 * 
 */

export class Venda {
    arrayItemVenda = [];
    arraySubTotalItemVenda = [];
    _descontoPercentual = 0.0;
    _descontoValor = 0.0;


    constructor (descontoPercentual,descontoValor){
        this.descontoPercentual = descontoPercentual;
        this.descontoValor = descontoValor;
    }

    addArray (itemVenda) {
        this.arrayItemVenda.push(itemVenda);
    }


    removeItem(i) {
        this.arrayItemVenda.splice(i, 1);
    }

    limpaVenda(){
        this.arrayItemVenda = [];
        this.descontoPercentual = 0;
        this.descontoValor = 0;
    }




    subtotal () {
        var soma = 0;
        this.arrayItemVenda.forEach((e) => {
            soma += e.comercializavel.subtotal();
        });
        return soma;
    }

    concederDesconto(percentual){
        this.descontoPercentual = percentual;
        this.descontoValor = this.subtotal() * (percentual / 100);
    }

    total () {
        return this.subtotal() - this.subtotal() * (this.descontoPercentual / 100);
    }



    get descontoPercentual () {return this._descontoPercentual};
    set descontoPercentual (descontoPercentual){this._descontoPercentual = descontoPercentual};

    get descontoValor () {return this._descontoValor};
    set descontoValor (descontoValor){this._descontoValor = descontoValor};
}

export default {
    Venda
}