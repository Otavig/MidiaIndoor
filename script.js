// Variável para armazenar os dados dos itens cadastrados
let array_galeria = [];

// Função para adicionar um item à lista
function btn_onclick_adicionar() {
    // Obter os valores dos campos do formulário
    let nome = document.getElementById("inputEmail4").value;
    let tipo = document.getElementById("inputState").value;
    let inicio = document.getElementById("floatingInput").value;
    let termino = document.getElementById("floatingInput2").value;
    let status = document.getElementById("inputState").value;
    let exibicao_tempo = document.getElementById("exibicao_tempo").value;

    // Criar um objeto com os dados do item
    let item = {
        nome: nome,
        tipo: tipo,
        inicio: inicio,
        termino: termino,
        status: status,
        exibicao_tempo: exibicao_tempo
    };

    // Adicionar o item à lista
    array_galeria.push(item);

    // Limpar os campos do formulário
    limparCampos();

    // Você pode fazer algo mais com os dados aqui, como enviar para um servidor ou exibir na tela
}

// Função para limpar os campos do formulário
function btn_onclick_limpar() {

    document.getElementById("inputEmail4").value = "";
    document.getElementById("inputState").value = "Tipo da mídia";
    document.getElementById("floatingInput").value = "";
    document.getElementById("floatingInput2").value = "";
    document.getElementById("inputState").value = "Status";
    document.getElementById("exibicao_tempo").value = "";
}

function limparCampos() {
    // Limpar os campos do formulário
    document.getElementById("inputEmail4").value = "";
    document.getElementById("inputState").value = "Tipo da mídia";
    document.getElementById("floatingInput").value = "";
    document.getElementById("floatingInput2").value = "";
    document.getElementById("inputState").value = "Status";
    document.getElementById("exibicao_tempo").value = "";
}

// Mostrar cadastro 
function btn_cadastro() {
    ocultar_divs()
    mostrar_div("tela_cadastro-main")
}

// Mostrar Lista
function btn_gerenciar() {
    ocultar_divs()
    mostrar_div("tela_gerenciar")

    let tela = document.getElementById("galeria")
    tela.innerHTML = ""
    let conteudo_html = ""

    for (let i = 0; i < array_galeria.length; i++) {
        let item = array_galeria[i];

        conteudo_html += `<div class="container-listagem">
            <h2>${item.nome}</h2>
            <p>Tipo: ${item.tipo}</p>
            <p>Data de Início: ${item.inicio}</p>
            <p>Data de Término: ${item.termino}</p>
            <p>Status: ${item.status}</p>
            <p>Tempo de Exibição: ${item.exibicao_tempo}</p>
        </div>`;
    }
    tela.innerHTML = conteudo_html;
}
// Função para exibir a tela de cadastro e ocultar os botões
function btn_cadastro() {
    // Ocultar os botões "Cadastrar" e "Gerenciar"
    document.getElementById("meutopo").style.display = "none";
    
    // Exibir a tela de cadastro
    mostrar_div("tela_cadastro-main");
}

// Função para ocultar a tela de cadastro e mostrar os botões novamente
function btn_voltar() {
    // Ocultar a tela de cadastro
    ocultar_div("tela_cadastro-main");
    
    // Mostrar os botões "Cadastrar" e "Gerenciar"
    document.getElementById("meutopo").style.display = "block";
}



function ocultar_divs() {
    document.getElementById("tela_cadastro-main").style.display = "none";
    document.getElementById("tela_gerenciar").style.display = "none";
}

function ocultar_div(id_div) {
    document.getElementById(id_div).style.display = "none";
}

function mostrar_div(id_div) {
    document.getElementById(id_div).style.display = "block"; // Alterado de "flex" para "block" para exibir a div corretamente.
}

// Inicialmente, ocultar as divs que não devem ser exibidas
ocultar_divs();



