/**  Imports
 * 
 * 
 * @author Lucas Barboza
*/
import {Comercializavel} from "./Comercializavel.js";

export class Servico extends Comercializavel {
    
    _duracaoEmMinutos = 0;

    constructor (codigo,descricao,preco,duracaoEmMinutos){
        super(codigo,descricao,preco);
        this.duracaoEmMinutos = duracaoEmMinutos;
    }

    get duracaoEmMinutos () {return this._duracaoEmMinutos};
    set duracaoEmMinutos (duracaoEmMinutos){this._duracaoEmMinutos = duracaoEmMinutos};

}

export default{
    Servico
}