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
const btn_cadastro = document.getElementById("btn_cadastro");
const btn_visualizar = document.getElementById("btn_visualizar");
const btn_exibir = document.getElementById("btn_exibir");
const btn_atualizar = document.getElementById("btn_atualizar");
const btn_select = document.getElementById("verifica");

btn_cadastro.addEventListener("click", async () => {
  // Desabilita o botão para evitar cliques repetidos
  btn_cadastro.disabled = true;

  document.getElementById("tela_cadastro_main").classList.remove("d-none");
  document.getElementById("tela_exibir").classList.add("d-none");
  document.getElementById("tela_visualizar").classList.add("d-none");
  document.getElementById("tela_atualizar_main").classList.add("d-none");

  let nome = document.getElementById("nome").value;
  let tipo = document.getElementById("tipo").value;
  let data_inicio = document.getElementById("data_inicio").value;
  let data_fim = document.getElementById("data_fim").value;
  let status = document.getElementById("status").value;
  let tempo = document.getElementById("tempo").value;
  let url = document.getElementById("url").value;

  var infoDB = {
      nome: nome,
      tipo: tipo,
      data_inicio: data_inicio,
      data_fim: data_fim,
      status: status,
      tempo: tempo,
      url: url
  };

  console.log(infoDB);

  try {
      let dados = await fetch("http://localhost:3000/api/midia_indoor", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(infoDB),
      });

      if (dados.ok) {
          btn_cadastro.click();
          btn_select.click();
      }
  } catch (error) {
      console.error("Erro ao cadastrar:", error);
  } finally {
      // Ativa o botão novamente após a conclusão (com sucesso ou falha)
      btn_cadastro.disabled = false;
  }
});


// Adiciona um evento ao botão pressionado btn_exibir
btn_exibir.addEventListener("click", async () => {


  document.getElementById("tela_exibir").classList.remove("d-none")
  document.getElementById("tela_cadastro_main").classList.add("d-none")
  document.getElementById("tela_visualizar").classList.add("d-none")
  document.getElementById("tela_atualizar_main").classList.add("d-none")
})

btn_atualizar.addEventListener("click", async () => {


  document.getElementById("tela_atualizar_main").classList.remove("d-none")
  document.getElementById("tela_cadastro_main").classList.add("d-none")
  document.getElementById("tela_exibir").classList.add("d-none")
  document.getElementById("tela_visualizar").classList.add("d-none")
})

btn_visualizar.addEventListener("click", async () => {


  document.getElementById("tela_visualizar").classList.remove("d-none")
  document.getElementById("tela_atualizar_main").classList.add("d-none")
  document.getElementById("tela_cadastro_main").classList.add("d-none")
  document.getElementById("tela_exibir").classList.add("d-none")
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
        resposta = await fetch("http://localhost:3000/api/midia_indoor");
    } else if (opcao == "id") {
        resposta = await fetch(`http://localhost:3000/api/midia_indoor/id/${busca}`);
    } else if (opcao == "nome") {
        resposta = await fetch(`http://localhost:3000/api/midia_indoor/nome/${busca}`);
    }
    // Se a reposta do servidor for 200 (ok) inicia uma varredura de dados
    if (resposta.ok) {
        // Vars
        html = html;
        let array_banco = await resposta.json();
        
        // Condição e varredura
        if (opcao == "todos" || opcao == "nome") {
        for (const dados of array_banco) {
            html += `<tr>                
            <td>${dados.id}</td>
            <td class='text-start'>${dados.nome}</td>
            <td><i onclick="editar(${dados.id})" class="bi bi-pencil"></td>
            <td><i onclick="excluir(${dados.id})" class="bi bi-trash"></i></td>
            </tr>`;
        }
        } else if (opcao == "id") {
        html += `<tr>                
            <td>${array_banco.id}</td>
            <td class='text-start'>${array_banco.nome}</td>
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

async function editar(id) {

  let resposta = await fetch(`http://localhost:3000/api/midia_indoor/id/${id}`);

  if (resposta.ok) {
    let dados = await resposta.json();
    console.clear()
    console.log(dados)
    btn_atualizar.click()
    document.getElementById("id_editado").value = dados.id
    document.getElementById("nome_editado").value = dados.nome
    document.getElementById("tipo_editado").value = dados.tipo
    document.getElementById("data_inicio_editado").value = dados.data_inicio
    document.getElementById("data_fim_editado").value = dados.data_fim
    document.getElementById("status_editado").value = dados.status
    document.getElementById("tempo_editado").value = dados.tempo
    document.getElementById("url_editado").value = dados.url
   

  }
}

async function excluir(id) {
 
    let dados = await fetch(`http://localhost:3000/api/midia_indoor/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (dados.ok) {
      btn_cadastro.click()
      btn_select.click()
    }
  }

  btn_atualizar.addEventListener("click", async () => {
    let nome_atualizado = document.getElementById("nome_editado").value;
    let tipo_atualizado = document.getElementById("tipo_editado").value;
    let data_inicio_atualizado = document.getElementById("data_inicio_editado").value;
    let data_fim_atualizado = document.getElementById("data_fim_editado").value;
    let status_atualizado = document.getElementById("status_editado").value;
    let tempo_atualizado = document.getElementById("tempo_editado").value;
    let url_atualizado = document.getElementById("url_editado").value;
    let id = document.getElementById("id_editado").value;

    let dados = await fetch("http://localhost:3000/api/midia_indoor/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            nome: nome_atualizado,
            tipo: tipo_atualizado,
            data_inicio: data_inicio_atualizado,
            data_fim: data_fim_atualizado,
            status: status_atualizado,
            tempo: tempo_atualizado,
            url: url_atualizado
        }),
    });

    if (dados.ok) {
        btn_cadastro.click();
        btn_select.click();
    }
});
