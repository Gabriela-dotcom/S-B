// Quantidade de brigadeiros que cabem em cada caixinha
const ESPACOS_POR_CAIXA = 4;


// Sabores disponíveis
const sabores = [
    "Brigadeiro Tradicional",
    "Brigadeiro de Ninho",
    "Casadinho"
];


// Pegando os elementos do HTML
const quantidadeCaixas = document.getElementById("quantidadeCaixas");
const caixasContainer = document.getElementById("caixasContainer");
const resumoCaixas = document.getElementById("resumoCaixas");
const enviarPedido = document.getElementById("enviarPedido");
const pagamento = document.getElementById("pagamento");
const campoTroco = document.getElementById("campoTroco");
const troco = document.getElementById("troco");
const campoValorTroco = document.getElementById("campoValorTroco");
const valorTroco = document.getElementById("valorTroco");

//Fução de troco
function verificarPagamento() {

    // Se escolher Dinheiro
    if (pagamento.value === "Dinheiro") {

        campoTroco.style.display = "block";

    } else {

        // Esconde os campos de troco
        campoTroco.style.display = "none";
        campoValorTroco.style.display = "none";

        // Limpa os valores
        troco.value = "";
        valorTroco.value = "";
    }
    
}

   pagamento.addEventListener("change", verificarPagamento);

  function verificarTroco() {

    if (troco.value === "Sim") {

        campoValorTroco.style.display = "block";

    } else {

        campoValorTroco.style.display = "none";
        valorTroco.value = "";
    }
}

   troco.addEventListener("change", verificarTroco);

//Botão para enviar os pedidos pelo whatsapp
enviarPedido.addEventListener("click", function() {

    // Primeiro verifica se o pedido está completo
    const pedidoValido = validarPedido();

    if (!pedidoValido) {
        return;
    }


    // Monta a mensagem do pedido
    const mensagem = montarMensagem();


    // Número do WhatsApp do seu amigo
    const numeroWhatsApp = "559492713798";


    // Transforma a mensagem em um formato aceito pelo link
    const mensagemCodificada = encodeURIComponent(mensagem);


    // Cria o link do WhatsApp
    const linkWhatsApp =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        mensagemCodificada;


    // Abre o WhatsApp
    window.open(linkWhatsApp, "_blank");

});

// Monta a mensagem que será enviada pelo WhatsApp
function montarMensagem() {

    // Dados do cliente
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;

    // Forma de pagamento
    const pagamento = document.getElementById("pagamento").value;

    // Informações de troco
    const precisaTroco = document.getElementById("troco").value;
    const valorTrocoInformado = document.getElementById("valorTroco").value;

    // Quantidade de caixinhas
    const quantidade = Number(quantidadeCaixas.value);

    // Começa a mensagem
    let mensagem = "";

    mensagem += "🍫 *NOVO PEDIDO — S & B*\n";
    mensagem += "━━━━━━━━━━━━━━━━━━━━\n\n";


    // CLIENTE
    mensagem += "👤 *DADOS DO CLIENTE*\n\n";

    mensagem += "Nome: " + nome + "\n";
    mensagem += "Telefone: " + telefone + "\n";
    mensagem += "Endereço: " + endereco + "\n";


    // PAGAMENTO
    mensagem += "\n💳 *PAGAMENTO*\n\n";

    mensagem += "Forma de pagamento: " + pagamento + "\n";

    if (pagamento === "Dinheiro") {

        if (precisaTroco === "Sim") {

            const valorFormatado = Number(valorTrocoInformado)
                .toFixed(2)
                .replace(".", ",");

            mensagem += "Troco para: R$ " + valorFormatado + "\n";

        } else {

            mensagem += "Troco: Não precisa\n";

        }
    }


    // PEDIDO
    mensagem += "\n📦 *PEDIDO*\n";
    mensagem += "━━━━━━━━━━━━━━━━━━━━\n\n";


    // Pega todas as caixinhas
    const caixas = caixasContainer.querySelectorAll(".caixa-pedido");


    // Percorre cada caixinha
    caixas.forEach(function(caixa, indice) {

        mensagem += "🍫 *CAIXINHA " + (indice + 1) + "*\n\n";


        // Pega os sabores
        const selects = caixa.querySelectorAll("select");


        // Objeto para contar os sabores
        const quantidadeSabores = {};


        // Conta os sabores repetidos
        selects.forEach(function(select) {

            const sabor = select.value;

            if (quantidadeSabores[sabor]) {

                quantidadeSabores[sabor]++;

            } else {

                quantidadeSabores[sabor] = 1;

            }

        });


        // Mostra os sabores
        for (const sabor in quantidadeSabores) {

            mensagem +=
                "• " +
                quantidadeSabores[sabor] +
                "x " +
                sabor +
                "\n";

        }


        mensagem += "\n";
    });


    // RESUMO
    mensagem += "━━━━━━━━━━━━━━━━━━━━\n";
    mensagem += "📦 *Caixinhas:* " + quantidade + "\n";
    mensagem += "💰 *TOTAL: " + valorTotal.textContent + "*\n";
    mensagem += "━━━━━━━━━━━━━━━━━━━━\n\n";

    mensagem += "❤️ Obrigado pelo pedido!";


    return mensagem;
}

// Preço de cada caixinha
const PRECO_CAIXA = 15.00;

// Elemento que mostra o valor total
const valorTotal = document.getElementById("valorTotal");
function calcularTotal() {

    let quantidade = Number(quantidadeCaixas.value);

    if (quantidade < 1 || isNaN(quantidade)) {
        quantidade = 1;
    }

    const total = quantidade * PRECO_CAIXA;

    valorTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// Função responsável por criar as caixinhas
function criarCaixinhas() {

    // Limpa as caixinhas que já existem
    caixasContainer.innerHTML = "";

    // Pega a quantidade escolhida pelo cliente
    let quantidade = Number(quantidadeCaixas.value);

    // Garante que tenha pelo menos 1 caixinha
    if (quantidade < 1 || isNaN(quantidade)) {
        quantidade = 1;
        quantidadeCaixas.value = 1;
    }


    // Cria cada caixinha
    for (let numeroCaixa = 1; numeroCaixa <= quantidade; numeroCaixa++) {

        // Cria o elemento da caixinha
        const caixa = document.createElement("div");

        caixa.classList.add("caixa-pedido");


        // Título da caixinha
        const titulo = document.createElement("h3");

        titulo.textContent = `🍫 Caixinha ${numeroCaixa}`;

        caixa.appendChild(titulo);


        // Descrição
        const descricao = document.createElement("p");

        descricao.textContent = "Escolha 4 sabores para esta caixinha:";

        caixa.appendChild(descricao);


        // Criar os 4 espaços da caixinha
        for (let espaco = 1; espaco <= ESPACOS_POR_CAIXA; espaco++) {

            // Criando o campo
            const campo = document.createElement("div");

            campo.classList.add("campo");


            // Criando o texto do campo
            const label = document.createElement("label");

            label.textContent = `Brigadeiro ${espaco}`;

            campo.appendChild(label);


            // Criando o select
            const select = document.createElement("select");

            select.required = true;


            // Opção inicial
            const opcaoInicial = document.createElement("option");

            opcaoInicial.textContent = "Escolha um sabor";
            opcaoInicial.value = "";
            opcaoInicial.disabled = true;
            opcaoInicial.selected = true;

            select.appendChild(opcaoInicial);


            // Adicionando os sabores
            sabores.forEach(function(sabor) {

                const opcao = document.createElement("option");

                opcao.value = sabor;
                opcao.textContent = sabor;

                select.appendChild(opcao);

            });


            // Coloca o select dentro do campo
            campo.appendChild(select);

            // Coloca o campo dentro da caixinha
            caixa.appendChild(campo);
        }


        // Coloca a caixinha dentro do container
        caixasContainer.appendChild(caixa);
    }


    // Atualiza o resumo
    resumoCaixas.textContent = quantidade;
}

// Verifica se todos os sabores foram escolhidos
function validarPedido() {

    const pagamento = document.getElementById("pagamento");
     if (pagamento.value === "") {

    alert("⚠️ Por favor, escolha uma forma de pagamento.");

    pagamento.focus();

    return false;
     }

    // Pega todos os campos de sabor
    const selects = caixasContainer.querySelectorAll("select");

    // Verifica cada campo
    for (let i = 0; i < selects.length; i++) {

        // Se o cliente não escolheu um sabor
        if (selects[i].value === "") {

            alert("⚠️ Por favor, escolha um sabor para todos os brigadeiros.");

            // Coloca o campo que está faltando em destaque
            selects[i].focus();

            return false;
        }
    }

    // Se todos os sabores foram escolhidos
    return true;
}

// Quando a quantidade mudar, recria as caixinhas
quantidadeCaixas.addEventListener("input", criarCaixinhas);
quantidadeCaixas.addEventListener("input", calcularTotal);


// Cria a primeira caixinha quando a página abrir
criarCaixinhas();
calcularTotal();