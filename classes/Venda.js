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
    total = [];


    constructor (descontoPercentual,descontoValor){
        this.descontoPercentual = descontoPercentual;
        this.descontoValor = descontoValor;
    }


    removeItem(i) {
        this.arrayItemVenda.splice(i, 1);
    }


    addArray (itemVenda) {
        // const item = this.arrayItemVenda.some((element) => {
        //     return (element.comercializavel.codigo === itemVenda.comercializavel.codigo);
        // });
        // if(item){
        //     throw new DominioException("Produto ja foi inserido.");
        // }
        this.arrayItemVenda.push(itemVenda);
    }

    subtotal () {

        this.arraySubTotalItemVenda.push(arrayItemVenda.subtotal());
        this.arraySubTotalItemVenda.forEach((element) => {
            soma += element;
        })
        // this.arrayItemVenda.forEach((element) => {this.total += element.comercializavel.subtotal();});
        return this.total;
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