import { Produto } from "./classes/Produto.js";
import { Servico } from "./classes/Servico.js";
import { ItemVenda } from "./classes/ItemVenda.js";
import { Venda } from "./classes/Venda.js";
import { DominioException } from "./classes/DominioException.js";
import produtos from "./src/produtos.js";
import servicos from "./src/servicos.js";

// Variáveis globais
var objItemVenda = {};
var eProduto = false;

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
 * @function descreveComercializavel insere no HTML o Serviço ou Produto de acordo com o código digitado. 
 *  */ 

function btnAdicionar (){
    try {
        const qtd = document.getElementById('inputQuantidade').value;
        const pedidoTabela = document.getElementById('pedidoTabela');
        const tamanhoTabela = pedidoTabela.rows.length;
        const row = pedidoTabela.insertRow(tamanhoTabela);
        const subTotalVenda = document.getElementById('subTotalVenda');
        const venda = new Venda();
        let comercializavel = null;
        
        const cellCodigo = row.insertCell(0);
        cellCodigo.innerHTML = objItemVenda.codigo;

        const cellDescricao = row.insertCell(1);
        cellDescricao.innerHTML = objItemVenda.descricao;

        const cellPreco = row.insertCell(2);
        cellPreco.innerHTML = objItemVenda.preco.toFixed(2).replace(".",",");

        const cellQuantidade = row.insertCell(3);
        const inputQtdTD = cellQuantidade.appendChild(document.createElement('input'));
        inputQtdTD.type='number';
        inputQtdTD.value = qtd;

        const cellSubtotal = row.insertCell(4);

        if (eProduto) {
            const produto = new Produto(objItemVenda.codigo, objItemVenda.descricao, objItemVenda.preco, objItemVenda.imagem, objItemVenda.estoque);
            comercializavel = new ItemVenda(inputQtdTD.value, produto);
            cellSubtotal.textContent = comercializavel.subtotal().toFixed(2).replace(".",",");
        } else {
            const servico = new Servico(objItemVenda.codigo, objItemVenda.descricao, objItemVenda.preco, objItemVenda.duracaoEmMinutos);
            comercializavel = new ItemVenda(inputQtdTD.value, servico);
            cellSubtotal.textContent = comercializavel.subtotal().toFixed(2).replace(".",",");
  
        }



        inputQtdTD.addEventListener("blur", () => {
            const validate = !objItemVenda.estoque || objItemVenda.estoque > inputQtdTD.value;
            if (!validate) {
                alert("Quantidade indisponível em estoque. Disponível: " + objItemVenda.estoque);
                inputQtdTD.value = objItemVenda.estoque;
                comercializavel.quantidade = inputQtdTD.value;
                cellSubtotal.textContent = comercializavel.subtotal().toFixed(2).replace(".",",");
            } else if (inputQtdTD.value < 1){
                alert('O mínimo da compra dever 1');
                inputQtdTD.value = 1;
                comercializavel.quantidade = inputQtdTD.value;
                cellSubtotal.textContent = comercializavel.subtotal().toFixed(2).replace(".",",");
            } 
            else {
                comercializavel.quantidade = inputQtdTD.value;
                cellSubtotal.textContent = comercializavel.subtotal().toFixed(2).replace(".",",");
            }   
        });

        venda.addArray(new ItemVenda(inputQtdTD.value, comercializavel));
        subTotalVenda.innerText = venda.subtotal();

        const cellRemover = row.insertCell(5);
        const buttonRemover = cellRemover.appendChild(document.createElement('button'));
        buttonRemover.textContent ='Remover';
        buttonRemover.id ='btnRemover';

        buttonRemover.addEventListener('click', () => {
            const index = row.rowIndex - 1;            
            venda.removeItem(index);
            row.remove();
            desconto(venda);    
            exibeVenda();
        });
    } catch(e) {
        alert(e.message);
    }
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
                eProduto = false;
                return;
            }
        }
        alert('O código "' +  codigo.value + '", não é um produto ou servico para venda.');
    }
}

function desconto(venda) {
    const spamDesconto = document.getElementById("desconto");
    const value = inputDesconto.value;
    if (value > -1 && value <= 15) {
      venda.concederDesconto(value);
      spamDesconto.textContent = venda.descontoValor;
    } else {
      alert("Valor máximo de desconto é 15%");
      inputDesconto.value = 0;
      spamDesconto.textContent = "0";
      venda.concederDesconto(0);
    }
    exibeVenda();
}

function exibeVenda() {
    const subtotal = document.getElementById("subTotalVenda");
    subtotal.textContent = venda.subtotal();

    const total = document.getElementById("total");
    total.textContent = venda.total();
}


