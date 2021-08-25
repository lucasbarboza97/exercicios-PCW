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
// iv.quantidade = 0;
// // iv.quantidade = 10;
// const total = iv.subtotal(p.preco);

const codigo = document.getElementById('codigo');
codigo.addEventListener('blur', function(event) {
    for (const p of produtos) {
        if(codigo.value === p.codigo) {
            console.log('é PRODUTO',p.codigo,codigo.value);
            return;
        }
    }
    for (const s of servicos) {
        if(codigo.value === s.codigo){
            console.log('é SERVICO',s.codigo,codigo.value);
            return;
        }
    }
    alert('O código ' +  codigo.value + ' não é um serviço ou produto para a venda.')
})