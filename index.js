/**  Imports
 * 
 * 
 * @author Lucas Barboza
*/
import { Produto } from "./classes/Produto.js";
import { Servico } from "./classes/Servico.js";
import { ItemVenda } from "./classes/ItemVenda.js";
import { Venda } from "./classes/Venda.js";
import { DominioException } from "./classes/DominioException.js";
import produtos from "./src/produtos.js";
import servicos from "./src/servicos.js";
import { enviarVenda } from "./src/envio-venda.js";


/**
 * Variáveis globais
 */
var selected_item = null;
var data = [];
var comercializavel = null;

data = data.concat(produtos, servicos);

const inputQuantidade = document.getElementById("inputQuantidade");
const inputCodigo = document.getElementById("codigo");
const imagem = document.getElementById("imagem");
const itemVenda = document.getElementById("itemVenda");
const duracao = document.getElementById("duracaoServicoVenda");
const buttonAdiciona = document.getElementById("btnAdd");
const bodyRow = document.getElementById("tBodyTabela");
const inputDesconto = document.getElementById("inputDesconto");
const buttonConcluir = document.getElementById("btnConcluir");

const venda = new Venda();

/** 
 *  Eventos
 */

inputCodigo.addEventListener("blur", (event) => {
    try {
        carregaDescricaoItem (event);
    } catch (e) {
        alert(e.message);
    }
});

buttonAdiciona.addEventListener("click", () => {
    try {
        btnAdd ();
    } catch (e) {
        alert(e.message);
    } 
});

try {
    exibeDadosVenda();
} catch (e) {
    alert(e.message);
}


inputDesconto.addEventListener("blur", () => {
    try {
        desconto();
    } catch (e) {
        alert(e.message);
    }
});


buttonConcluir.addEventListener("click", () => {
    try {
        btnConcluir();
    } catch (e) {
        alert(e.message);
    }
});



/** Funções auxiliares
 * 
 * @function carregaDescricaoItem (event) Descreve a descrição do pedido, de acordo com o código digitado. E recebe um evento de blur do input do código.
 * @function btnAdd() Adciona uma venda, de acordo com o código digitado.
 * @function addLinhaTabela() É chamada dentro da função anterior para adcionar itens na tabela do HTML.
 * @function desconto() Calcula o desconto para exibir no section de vendas.
 * @function exibeDadosVenda() Exibe o total da venda e o seu subtotal já calculado com desconto.
 * @function btnConcluir() Simula uma compra, e limpa os dados do HTML.
 * @function limpaHeader() e @function limpaTabela(), são chamadas dentro do butão concluir para limpeza da tabela.
 * @function btnRemover(tr) recebe uma tabela  e é chamado pelo clique do botão remover de cada item na tabela e remove o item.
 * @function alteraQtdItemTabela é chamado pelo evento blur de cada input dos itens adicionado na tabela do HTML, se caso alterado a sua quantidade é executado.
 * 
 */

function carregaDescricaoItem(event) {
    const codigo = event.target.value.toUpperCase();
    selected_item = data.find((item) => {
        return item.codigo === codigo;    
    });

    if (selected_item) {
        itemVenda.textContent = `${selected_item.descricao}  -  R$ ${selected_item.preco.toFixed(2).replace(".",",")}`;
        if (selected_item.codigo.indexOf("S") !== -1) {
            imagem.hidden = true;
            duracao.innerText = `Duração: ${selected_item.duracaoEmMinutos} Minutos`;
        } else if (selected_item.codigo.indexOf("P") !== -1) {
            imagem.hidden = false;
            imagem.src = `./img/${selected_item.imagem}`;
            duracao.innerText = "Duração: N/A";
        }
    } else {
        itemVenda.textContent = "Não encontrado";
        duracao.innerText = "";
        imagem.src = '';;
    }
}

function btnAdd() {
    try {
        if (selected_item) {
            const qtd = inputQuantidade.value;
            if (qtd > selected_item.estoque) {
                inputQuantidade.value = selected_item.estoque;
                throw new DominioException(`Quantidade indisponível em estoque. Disponível: ${selected_item.estoque}.`);
            }

            if (selected_item.codigo.indexOf("P") !== -1) {
                const produto = new Produto(selected_item.codigo,selected_item.descricao,selected_item.preco,selected_item.imagem,selected_item.estoque);
                comercializavel = new ItemVenda(qtd, produto);
            } else {
                const servico = new Servico(selected_item.codigo,selected_item.descricao,selected_item.preco,selected_item.duracaoEmMinutos);
                comercializavel = new ItemVenda(qtd, servico);
            }

            venda.addArray(new ItemVenda(qtd, comercializavel));

            addLinhaTabela();
            desconto();
            exibeDadosVenda();
        } else {
            throw new DominioException("Selecione um produto ou serviço válido");
        }
    } catch (e) {
        alert(e.message);
    }
}

function addLinhaTabela() {
    const tr = document.createElement("tr");

    const codTd = document.createElement("td");
    const descTd = document.createElement("td");
    const precoTd = document.createElement("td");
    const qtdTd = document.createElement("td");
    const inputQtdList = document.createElement("input");
    const subTotalTd = document.createElement("td");
    const removeTd = document.createElement("td");
    const buttonRemove = document.createElement("button");


    codTd.innerText = comercializavel.codigo;
    descTd.innerText = comercializavel.descricao;
    precoTd.innerText = comercializavel.preco.toFixed(2).replace(".",",");

    inputQtdList.id = "input-qtd-list";
    inputQtdList.type = "number";
    inputQtdList.min = "1";
    inputQtdList.value = comercializavel.quantidade;
    inputQtdList.addEventListener("blur", () => {
        alteraQtdItemTabela(inputQtdList,tr,subTotalTd);
    });

    subTotalTd.innerText = comercializavel.subtotal().toFixed(2).replace(".",",");;

    buttonRemove.type = "button";
    buttonRemove.textContent = "Remover";
    buttonRemove.addEventListener("click", () => {
        btnRemover(tr);
    });
    
    tr.appendChild(codTd);
    tr.appendChild(descTd);
    tr.appendChild(precoTd);
    qtdTd.appendChild(inputQtdList);
    tr.appendChild(qtdTd);
    tr.appendChild(subTotalTd);
    removeTd.appendChild(buttonRemove);
    tr.appendChild(removeTd);
    bodyRow.append(tr);
}

function desconto() {
    const textDesconto = document.getElementById("inputDesconto");
    const value = inputDesconto.value;
    if (value > -1 && value <= 15) {
        venda.concederDesconto(value);
        textDesconto.textContent = venda.descontoValor;
    } else {
        alert("Valor máximo de desconto é 15%");
        inputDesconto.value = 0;
        textDesconto.textContent = "0";
        venda.concederDesconto(0);
    }
    exibeDadosVenda();
}

function exibeDadosVenda() {
    const subtotal = document.getElementById("subTotalVenda");
    const total = document.getElementById("total");

    subtotal.textContent = venda.subtotal().toFixed(2).replace(".",",");;
    total.textContent = venda.total().toFixed(2).replace(".",",");;
}

function btnConcluir() {
    enviarVenda(venda);
    venda.limpaVenda();
    limpaHeader();
    comercializavel = null;
    exibeDadosVenda();
    desconto();
    limpaTabela();
}

function limpaHeader() {
    inputQuantidade.value = "1";
    inputCodigo.value = "";
    itemVenda.textContent = "Descrição - R$000,00";
    duracao.innerText = "Duração: N/A";
    imagem.src = '';
}

function limpaTabela() {
    bodyRow.innerHTML = "";
}

function btnRemover(tr) {
    const index = tr.rowIndex - 1;
    venda.removeItem(index);
    desconto();
    tr.remove();
    exibeDadosVenda();
}

function alteraQtdItemTabela(inputQtdList,tr,subTotalTd){
    if (!(!comercializavel.estoque || comercializavel.estoque > inputQtdList.value)) {
        alert(`Quantidade indisponível em estoque. Disponível: ${comercializavel.estoque}.`);
        inputQtdList.value = comercializavel.estoque;
    }

    const index = tr.rowIndex - 1;
    comercializavel.quantidade = inputQtdList.value;
    venda[index] = comercializavel;
    desconto();
    subTotalTd.innerText = comercializavel.subtotal().toFixed(2).replace(".",",");
    exibeDadosVenda(venda);
}