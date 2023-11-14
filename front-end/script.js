// Variável para armazenar os dados dos itens cadastrados
let array_galeria = [];
const btn_cadastro = document.getElementById("btn-cadastro");

btn_cadastro.addEventListener("click", async () => {
    
    document.getElementById("tela_cadastro-main").classList.remove("d-none")
    document.getElementById("tela_gerenciar").classList.add("d-none")
    
    // Obter os valores dos campos do formulário
    let nome = document.getElementById("nome").value;
    let tipo = document.getElementById("tipo").value;
    let inicio = document.getElementById("Data_inicio").value;
    let termino = document.getElementById("Data_termeino").value;
    let status = document.getElementById("status").value;
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
})

const btn_gerenciar = document.getElementById("btn-gerenciar");
btn_gerenciar.addEventListener("click", async () => {

    document.getElementById("tela_gerenciar").classList.remove("d-none")
    document.getElementById("tela_cadastro-main").classList.add("d-none")
})





