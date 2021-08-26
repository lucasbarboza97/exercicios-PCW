import { Produto } from "./classes/Produto.js";
import { Servico } from "./classes/Servico.js";
import { ItemVenda } from "./classes/ItemVenda.js";
import { Venda } from "./classes/Venda.js";
import { DominioException } from "./classes/DominioException.js";
import produtos from "./src/produtos.js";
import servicos from "./src/servicos.js";


// Variáveis 
let objItemVenda = {};
var comercializavel = null;

let eProduto = false;

const venda = new Venda();



// Exibe a descrição do pedido de acordo com o código digitado.
const codigo = document.getElementById('codigo');
codigo.addEventListener('blur', function() {
    descreveComercializavel ();
});

// Botão adcionar item na tabela.
document.getElementById('btnAdd').onclick = function(event) {
    btnAdicionar(event);
}


/**
 *                                                      Funções auxiliares.
 * -----------------------------------------------------------------------------------------------------------------------------------
 * @function btnAdicionar insere uma novo item venda. Instância um Comercializável e um Item Venda. Além de calcular o total da venda
 * @function addNaTabela Insere dados na tabela HTML.
 * @function descreveComercializavel insere no HTML o Serviço ou Produto de acordo com o código digitado. 
 *  */ 

function btnAdicionar (){
    const qtdItemVenda = imputQuantidade.value;

    try{
        if(qtdItemVenda < 0){
            imputQuantidade.value = 1;
            throw new DominioException ("Deve ter no mínimo 1 item para a venda."); // Veririca se existe o item disponível em estoque.
        }else if (objItemVenda) {
            if (qtdItemVenda > Number(objItemVenda.estoque)) {
                throw new DominioException(`Quantidade indisponível em estoque. Disponível: ${objItemVenda.estoque}.`); // Verifica se o ítem tem em estoque
            } else if (eProduto === true) {
                const produto = new Produto(objItemVenda.codigo, objItemVenda.descricao, objItemVenda.preco, objItemVenda.imagem, objItemVenda.estoque);
                comercializavel = new ItemVenda(qtdItemVenda, produto);
            } else if (eProduto == false) {
                const servico = new Servico(objItemVenda.codigo, objItemVenda.descricao, objItemVenda.preco, objItemVenda.duracaoEmMinutos);
                comercializavel = new ItemVenda(qtdItemVenda, servico);
            } else{
                throw new DominioException ("Digite um código de produto.")
            }

            venda.addArray(new ItemVenda(qtdItemVenda, comercializavel));

            addNaTabela(qtdItemVenda);

        }
    } catch(e) {
        alert(e.message);
    }
}

function addNaTabela (qtdItemVenda) {
    const pedidoTabela = document.getElementById('pedidoTabela');
    const tamanhoTabela = pedidoTabela.rows.length;

    const row = pedidoTabela.insertRow(tamanhoTabela);
    
    const cellCodigo = row.insertCell(0);
    const cellDescricao = row.insertCell(1);
    const cellPreco = row.insertCell(2);
    const cellQuantidade = row.insertCell(3);
    const cellSubtotal = row.insertCell(4);

    cellCodigo.innerHTML = objItemVenda.codigo;
    cellDescricao.innerHTML = objItemVenda.descricao;
    cellPreco.innerHTML = objItemVenda.preco.toFixed(2).replace(".",",");
    cellQuantidade.innerHTML = qtdItemVenda;
    cellSubtotal.innerHTML = comercializavel.subtotal().toFixed(2).replace(".",",");
}

function descreveComercializavel () {
    if(codigo.value == ''){
        alert('Digite um código.');
    }else{
        for (const p of produtos) {
            if(codigo.value === p.codigo) {
                itemVenda.innerText = p.descricao + ' - R$' + p.preco.toFixed(2).replace(".",",");
                imagem.src = './img/' + p.imagem;
                duracaoServicoVenda.innerText = 'Duração: N/A';
                objItemVenda = p;
                eProduto = true;
                return;
            }
        }
        for (const s of servicos) {
            if(codigo.value === s.codigo){
                itemVenda.innerText = s.descricao + ' - R$' + s.preco.toFixed(2).replace(".",",");
                imagem.src = '';
                duracaoServicoVenda.innerText = 'Duração: ' + s.duracaoEmMinutos + ' minutos';
                objItemVenda = s;
                return;
            }
        }
        alert('O código "' +  codigo.value + '", não é um produto ou servico para venda.');
    }
}


