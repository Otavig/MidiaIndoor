const btn_gerenciar = document.getElementById("btn-gerenciar");
const btn_exibir = document.getElementById("btn-exibir")
const btn_cadastro = document.getElementById("btn-cadastro");

btn_cadastro.addEventListener("click", async () => {
    
    document.getElementById("tela_cadastro-main").classList.remove("d-none")
    document.getElementById("tela_exibir2").classList.remove("d-none")
    document.getElementById("tela_gerenciar").classList.add("d-none")
    
    // Obter os valores dos campos do formulário
    let nome = document.getElementById("nome").value;
    let tipo = document.getElementById("tipo").value;
    let data_inicio = document.getElementById("data_inicio").value;
    let data_fim = document.getElementById("data_fim").value;
    let status = document.getElementById("status").value;
    let tempo = document.getElementById("tempo").value;

    // Contato com a rota
    let dados = await fetch("http://localhost:3000/api/midia", {
        method: "POST", 
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({nome: nome, tipo: tipo, data_inicio: data_inicio, data_fim: data_fim, status: status, tempo: tempo}),
    });

    if(dados.ok){

    }


    // Adicionar o item à lista
    array_galeria.push(item);

    // Limpar os campos do formulário
    limparCampos();
})

btn_gerenciar.addEventListener("click", async () => {

    document.getElementById("tela_gerenciar").classList.remove("d-none")
    document.getElementById("tela_cadastro-main").classList.add("d-none")
    document.getElementById("tela_exibir2").classList.add("d-none")
        
    
})

btn_exibir.addEventListener("click", async () => {

    document.getElementById("tela_gerenciar").classList.remove("d-none")
    document.getElementById("tela_cadastro-main").classList.add("d-none")
    document.getElementById("tela_exibir2").classList.add("d-none")
        
    
})

// mudança de cor de fundo
const temaOscuro = ()=>{
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
    document.querySelector("#d1-icon").setAttribute("class", "bi bi-sun-fill");
}

const temaClaro = ()=>{
    document.querySelector("body").setAttribute("data-bs-theme", "light");
    document.querySelector("#d1-icon").setAttribute("class", "bi bi-moon-fill");
}

const cambiarTema = () =>{
    document.querySelector("body").getAttribute("data-bs-theme") === "light"?
    temaOscuro() : temaClaro();
}



// Codigo para montar a tabela de listagem

btn_gerenciar.addEventListener("click", async () => {
    let busca = document.getElementById("input").value;
    let opcao = document.getElementById("").value;
    let html = `<table class="table">
                  <thead>
                    <tr>    
                      <th scope="col">id</th>
                      <th scope="col" class='text-start'>Nome</th>
                      <th scope="col" class='text-start'>e-mail</th>
                      <th scope="col">Editar</i></th>
                      <th scope="col">Excluir</th>
                    </tr>
                  </thead>
                  <tbody>`;
    
    document.getElementById("saida").innerHTML = "";
    document.getElementById("").value = ""
  
    // let resposta = "";
    // if (opcao == "todos") {
    //   resposta = await fetch("http://localhost:3000/api/usuarios");
    // } else if (opcao == "id") {
    //   resposta = await fetch(`http://localhost:3000/api/usuarios/id/${busca}`);
    // } else if (opcao == "nome") {
    //   resposta = await fetch(`http://localhost:3000/api/usuarios/nome/${busca}`);
    // } else if (opcao == "email") {
    //   resposta = await fetch(`http://localhost:3000/api/usuarios/email/${busca}`);
    // }
  
    if (resposta.ok) {
      html = html;
      let array_resultado = await resposta.json();
      if (opcao == "todos" || opcao == "nome"  || opcao == "email") {
        for (const dados of array_resultado) {
          html += `<tr>                
          <td>${dados.id}</td>
          <td class='text-start'>${dados.nome}</td>
          <td class='text-start'>${dados.email}</td>
          <td><i onclick="editar(${dados.id})" class="bi bi-pencil"></td>
          <td><i onclick="excluir(${dados.id})" class="bi bi-trash"></i></td>
          </tr>`;
        }
      } else if (opcao == "id" ) {
        html += `<tr>                
          <td>${array_resultado.id}</td>
          <td class='text-start'>${array_resultado.nome}</td>
          <td class='text-start'>${array_resultado.email}</td>
          <td><i class="bi bi-pencil"></td>
          <td><i class="bi bi-trash"></i></td>
          </tr>`;
      }
  
      html += `</tbody></table>`;
    }
    document.getElementById("saida").innerHTML = html;
    
  });
