export class Venda {
    
    _descontoPercentual = 0.0;
    _descontoValor = 0;

    constructor (descontoPercentual,descontoValor){
        this.descontoPercentual = descontoPercentual;
        this.descontoValor = descontoValor;
    }

    subTotal () {
        
    }

    get descontoPercentual () {return this._descontoPercentual};
    set descontoPercentual (descontoPercentual){this._descontoPercentual = descontoPercentual};

    get descontoValor () {return this._descontoValor};
    set descontoValor (descontoValor){this._descontoValor = descontoValor};



}

export default {
    Venda
}