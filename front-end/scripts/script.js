// mudança de cor de fundo
const temaOscuro = () => {
  document.querySelector("body").setAttribute("data-bs-theme", "dark");
  document.querySelector("#d1-icon").setAttribute("class", "bi bi-sun-fill");
}

const temaClaro = () => {
  document.querySelector("body").setAttribute("data-bs-theme", "light");
  document.querySelector("#d1-icon").setAttribute("class", "bi bi-moon-fill");
}

const cambiarTema = () => {
  document.querySelector("body").getAttribute("data-bs-theme") === "light" ?
    temaOscuro() : temaClaro();
}
/*
 IDs:

 btn_cadastro
 btn_gerenciar
 btn_visualizar
 btn_exibir

tela_cadastro_formulario
nome
tipo
data_inicio
data_fim
status
tempo
url

btn_cadastrar
btn_limpar
btn_voltar

tela_gerenciar
btn_busca
opcoes

tela_exibir

tela_visualizar

*/


// Vars Botões
const btn_cadastro = document.getElementById("btn_cadastro")
const btn_gerenciar = document.getElementById("btn_gerenciar")
const btn_visualizar = document.getElementById("btn_visualizar")
const btn_exibir = document.getElementById("btn_exibir")

// Adiciona um evento quando o botão for pressionado
btn_cadastro.addEventListener("click", async () => {
    try {
        // Vars locais (Pega a informações do DB)
        let nome = document.getElementById("nome").value
        let tipo = document.getElementById("tipo").value
        let data_inicio = document.getElementById("data_inicio").value
        let data_fim = document.getElementById("data_fim").value
        let status = document.getElementById("status").value
        let tempo = document.getElementById("tempo").value
        let url = document.getElementById("url").value
      
        // Body do fetch() com as infos
        var infoDB = { nome: nome, tipo: tipo, data_inicio: data_inicio, data_fim: data_fim, data_fim: data_fim, status: status, tempo: tempo, url: url }
      
        // Conexação com API
        let dados = await fetch("http://localhost:3000/api/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(infoDB),
        })
    } catch(error) {
        console.log(error)
    }

})

// Adiciona um evento para quando o botão select for pressionado
btn_select.addEventListener("click", async () => {
    // Vars locais
    let busca = document.getElementById("busca").value;
    let opcao = document.getElementById("opcoes").value;    
    let html = `<table class="table">
                    <thead>
                    <tr>    
                        <th scope="col">id</th>
                        <th scope="col" class='text-start'>Nome</th>
                        <th scope="col">Editar</i></th>
                        <th scope="col">Excluir</th>
                    </tr>
                    </thead>
                    <tbody>`;

    // Limpa os inputs
    document.getElementById("saida").innerHTML = "";
    document.getElementById("busca").value = ""

    // Busca as conexões
    let resposta = "";
    if (opcao == "todos") {
        resposta = await fetch("http://localhost:3000/api/usuarios");
    } else if (opcao == "id") {
        resposta = await fetch(`http://localhost:3000/api/usuarios/id/${busca}`);
    } else if (opcao == "nome") {
        resposta = await fetch(`http://localhost:3000/api/usuarios/nome/${busca}`);

    // Se a reposta do servidor for 200 (ok) inicia uma varredura de dados
    if (resposta.ok) {
        // Vars
        html = html;
        let array_resultado = await resposta.json();
        
        // Condição e varredura
        if (opcao == "todos" || opcao == "nome") {
        for (const dados of array_resultado) {
            html += `<tr>                
            <td>${dados.id}</td>
            <td class='text-start'>${dados.nome}</td>
            <td><i onclick="editar(${dados.id})" class="bi bi-pencil"></td>
            <td><i onclick="excluir(${dados.id})" class="bi bi-trash"></i></td>
            </tr>`;
        }
        } else if (opcao == "id") {
        html += `<tr>                
            <td>${array_resultado.id}</td>
            <td class='text-start'>${array_resultado.nome}</td>
            <td><i class="bi bi-pencil"></td>
            <td><i class="bi bi-trash"></i></td>
            </tr>`;
        }

        // Adiciona uma tabela ao HTML
        html += `</tbody></table>`;
  }
  // Preenche a saida do html
  document.getElementById("saida").innerHTML = html;


});
































































































