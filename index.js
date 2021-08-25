import { Comercializavel } from "./classes/Comercializavel.js"
import { Produto } from "./classes/Produto.js";
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

const codigo = document.getElementById('codigo');
codigo.addEventListener('blur', function(event) {
    if(codigo.value == ''){
        alert('Digite um código.');
    }else{
        for (const p of produtos) {
            if(codigo.value === p.codigo) {
                itemVenda.innerText = p.descricao + ' - R$' + p.preco.toFixed(2);
                duracaoServicoVenda.innerText = 'Duração: N/A';
                return ;
            }
        }
        for (const s of servicos) {
            if(codigo.value === s.codigo){
                itemVenda.innerText = s.descricao + ' - R$' + s.preco.toFixed(2);
                duracaoServicoVenda.innerText = 'Duração: ' + s.duracaoEmMinutos + ' minutos';
                return;
            }
        }
        alert('O código "' +  codigo.value + '", não é um produto ou servico para venda.');
    }
})