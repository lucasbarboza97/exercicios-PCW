import { Comercializavel } from "./classes/Comercializavel.js"
import { Produto } from "./classes/Produto.js";
import { Servico } from "./classes/Servico.js";
import { ItemVenda } from "./classes/ItemVenda.js";
import produtos from "./src/produtos.js";
import servicos from "./src/servicos.js";


// const c = new Comercializavel();
// console.log(c);

// const p = new Produto();
// p.preco = 10.00;
// console.log(p);

// const iv = new ItemVenda();
// iv.quantidade = 10;
// const total = iv.subtotal(p.preco);
// console.log(total);

let objItemVenda = {};
let eProduto = false;

// Exibe a descrição do pedido de acordo com o código digitado.
const codigo = document.getElementById('codigo');
codigo.addEventListener('blur', function() {
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
});

document.getElementById('btnAdd').onclick = function(event) {
    btnAdicionar(event);
}


function btnAdicionar (){

    const qtdItemVenda = quantidade.value;
    let produtoItemVenda = {};
    let servicoItemVenda = {};

    // Preenche tabela, de acordo com o código digitado.
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
    cellPreco.innerHTML = objItemVenda.preco;
    cellQuantidade.innerHTML = qtdItemVenda;

    // Instanciando produto, ou serviço
    if (eProduto === true) {
        produtoItemVenda = new Produto(objItemVenda.codigo, objItemVenda.descricao, objItemVenda.preco, objItemVenda.imagem, objItemVenda.estoque);
    } else {
        servicoItemVenda = new Servico(objItemVenda.codigo, objItemVenda.descricao, objItemVenda.preco, objItemVenda.duracaoEmMinutos);
    }

    // Instancia itemVenda
    console.log(produtoItemVenda);
    console.log(servicoItemVenda);

    const iv = new ItemVenda(qtdItemVenda);

    //Calcula o subtotal para exibir na tabela
    cellSubtotal.innerHTML = iv.subtotal();
}

