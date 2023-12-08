
// --------------------
// DECLARAR AS VARS 
// --------------------

// URL
const URL_API = "http://localhost:3000";

// NAVBAR
const btn_Cadastrar = document.getElementById("btn_Cadastrar");
const btn_Atualizar = document.getElementById("btn_Atualizar");
const btn_Busca = document.getElementById("btn_Busca");
const btn_Exibir = document.getElementById("btn_Exibir");

//esconder
const btn_Update = document.getElementById("update");


// BUSCA
let modoEdicaoAtivo = false;
const input_busca = document.getElementById("input_busca");
const busca_formulario = document.getElementById("busca_formulario");
const busca_opcoes = document.getElementById("busca_opcoes");
const busca_btn_verificar = document.getElementById("busca_btn_verificar");
const busca_saida = document.getElementById("busca_saida");

// ---------------------
// FUNÇÕES DO CÓDIGO
// ---------------------

/**
 * Função para atualizar o ocultar
 */
function toggleOculto() {
    //aparece o editar
    btn_Update.style.display = "block";
    btn_Atualizar.style.display = "block";

    var navItem = document.querySelector('.oculto');

    if (navItem.classList.contains('oculto')) {
        navItem.classList.remove('oculto');
    } else {
        navItem.classList.add('oculto');
    }
}

// Evento cadastrar
btn_Cadastrar.addEventListener("click", async () => {
    mostrarDiv('cadastro');
    //esconde o editar
    btn_Update.style.display = "none";
    btn_Atualizar.style.display = "none";

});

cadastro_btn_cadastro.addEventListener("click", async (evt) =>{
    try {
                //esconde o editar
                btn_Update.style.display = "none";
                btn_Atualizar.style.display = "none";

                // Obter valores do formulário
                let nome = document.getElementById("cadastro_nome_midia").value;
                let tipo = document.getElementById("cadastro_tipo").value;
                let data_inicio = document.getElementById("cadastro_data_inicio").value;
                let data_fim = document.getElementById("cadastro_data_fim").value;
                let status = document.getElementById("cadastro_status").value;
                let tempo = document.getElementById("cadastro_tempo").value;
                let url = document.getElementById("cadastro_url").value;
                let arquivo = document.getElementById("cadastro_arquivo")
                // arquivos
                evt.preventDefault()

                const arq = arquivo.files[0]

                // Validar se selecionou um arquivo
                // if (!arq) {
                //     alert("Selecione um arquivo")
                //     return
                // }
                // try {

                //     const fd = new FormData()
                //     fd.append("arquivo", arq)
                //     fd.append("dados", JSON.stringify({ titulo: "teste" }))


                //     let resp = await fetch("http://localhost:3007/upload",
                //         {
                //             method: 'POST',
                //             body: fd
                //         })
                //     if (resp.ok) {
                //         alert("Enviado com sucesso")
                //     }
                // } catch (erro) {
                //     alert("Erro")
                // }

        
                // Formatar datas no padrão 'YYYY-MM-DD'
                data_inicio = new Date(data_inicio).toISOString().split('T')[0];
                data_fim = new Date(data_fim).toISOString().split('T')[0];
        
                // Enviar dados para o servidor
                let dados = await fetch(`${URL_API}/api/midia_indoor`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nome,
                        tipo,
                        data_inicio,
                        data_fim,
                        status,
                        tempo,
                        url,
                    }),
                });
        
                if (dados.ok) {
                    btn_Busca.click();
                    busca_btn_verificar.click();
                }
            } catch (erro) {
                console.error("Erro ao cadastrar midía:", erro);
            }
        });


busca_btn_verificar.addEventListener("click", async() => {
    try {
        // Mostrar div escondida

        let busca = document.getElementById("input_busca").value;
        let opcao = document.getElementById("busca_opcoes").value;

        let html = `<table class="table">
                    <thead>
                        <tr>    
                            <th scope="col">id</th>
                            <th scope="col" class='text-start'>Nome</th>
                            <th scope="col" class='text-start'>Status</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>`;

        busca_saida.innerHTML = "";
        input_busca.value = "";

        // Vê qual a escolha da procura
        let resposta;
        if (opcao === "todos") {
            resposta = await fetch(`${URL_API}/api/midia_indoor`);
        } else if (opcao === "id") {
            resposta = await fetch(`${URL_API}/api/midia_indoor/id/${busca}`);
        } else if (opcao === "nome") {
            resposta = await fetch(`${URL_API}/api/midia_indoor/nome/${busca}`);
        }

        // Verifica se a resposta foi bem-sucedida
        if (resposta.ok) {
            let array_res = await resposta.json();
            if (opcao === "todos" || opcao === "nome") {
                for (const dados of array_res) {
                    html += `<tr>                
                        <td>${dados.id}</td>
                        <td class='text-start'>${dados.nome}</td>
                        <td class='text-start'>${dados.status}</td>
                        <td><i onclick="editar(${dados.id}); toggleOculto();" class="bi bi-pencil"></i></td>
                        <td><i onclick="excluir(${dados.id});" class="bi bi-trash"></i></td>
                    </tr>`;
                }
            } else if (opcao === "id" && array_res.id !== undefined) {
                html += `<tr>                
                    <td>${array_res.id}</td>
                    <td class='text-start'>${array_res.nome}</td>
                    <td class='text-start'>${array_res.status}</td>
                    <td class='text-start'>${array_res.url}</td>
                    <td><i onclick="editar(${array_res.id}); toggleOculto();" class="bi bi-pencil"></i></td>
                    <td><i onclick="excluir(${array_res.id});" class="bi bi-trash"></i></td>
                </tr>`;
            }

            html += `</tbody></table>`;
        }

        busca_saida.innerHTML = html;
    } catch (erro) {
        console.error("Erro ao buscar midía:", erro);
    }
})

// Evento para atualizar os dados
btn_Atualizar.addEventListener("click", async () => {
    mostrarDiv('update');
});

atualizar_btn_dados.addEventListener("click", async () => {
    try {
        // Mostrar div escondida

        // Obter valores do formulário de atualização
        let nome_atualizado = document.getElementById("atualizar_nome_midia").value
        let tipo_atualizado = document.getElementById("atualizar_tipos").value
        let data_inicio_atualizado = document.getElementById("atualizar_data_inicio").value
        let data_fim_atualizado = document.getElementById("atualizar_data_fim").value
        let status_atualizado = document.getElementById("atualizar_status").value
        let tempo_atualizado = document.getElementById("atualizar_tempo").value
        let url_atualizado = document.getElementById("atualizar_url").value
        let id = document.getElementById("atualizar_id_editar").value


        // Enviar dados para o servidor
        let dados = await fetch(`${URL_API}/api/midia_indoor/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                nome: nome_atualizado,
                tipo: tipo_atualizado,
                dataInicio: data_inicio_atualizado,
                dataFim: data_fim_atualizado,
                status: status_atualizado,
                tempo: tempo_atualizado,
                url: url_atualizado,
            }),
        });

        if (dados.ok) {
            btn_Busca.click();
            busca_btn_verificar.click();
        }
    } catch (erro) {
        console.error("Erro ao atualizar midia indoor:", erro);
    }
})

/**
 * Função para editar usuário
 */
async function editar(id) {
    try {
        let resposta = await fetch(`${URL_API}/api/midia_indoor/id/${id}`);
        if (resposta.ok) {
            let dados = await resposta.json();

            // Abre a tela de atualizar
            btn_Atualizar.click();

            // Preenche os campos de atualização
            document.getElementById("atualizar_data_inicio").value = dados.data_inicio;
            document.getElementById("atualizar_data_fim").value = dados.data_fim;
            document.getElementById("atualizar_status").value = dados.status;
            document.getElementById("atualizar_tempo").value = dados.tempo;
            document.getElementById("atualizar_url").value = dados.url;
            document.getElementById("atualizar_id_editar").value = dados.id;

            // Ativa o modo de edição
            modoEdicaoAtivo = true;
        }
    } catch (erro) {
        console.error("Erro ao editar usuário:", erro);
    }
}



/**
 * Função para excluir usuário
*/

async function excluir(id) {
        //esconde o editar
        btn_Update.style.display = "none";
        btn_Atualizar.style.display = "none";

        let dados = await fetch(`${URL_API}/api/midia_indoor/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (dados.ok) {
            btn_Busca.click();
            busca_btn_verificar.click();
        }
    }



// Evento para resolver click inicial da pagina
document.addEventListener("DOMContentLoaded", async () => {
    // Chama a função cambiarTema() diretamente
    cambiarTema();
});

// Evento buscar {REFAZER COM AS NOVAS OPÇÕES}
btn_Busca.addEventListener("click", async () => {
    mostrarDiv('busca');
    
});

/**
 * Função para limpar os campos do formulário de cadastro
 */
function limparFormularioCadastro() {
    // Limpa os valores dos campos
    cadastro_nome_midia.value = "";
    cadastro_tipos.value = "";
    cadastro_data_inicio.value = "";
    cadastro_data_fim.value = "";
    cadastro_status.value = "";
    cadastro_tempo.value = "";
    cadastro_url.value = "";
}

/**
 * Função para limpar os campos do formulário de atualização
 */
function limparFormularioAtualizacao() {
    // Limpa os valores dos campos
    atualizar_id_editar.value = "";
    atualizar_nome_midia.value = "";
    atualizar_tipos.value = "";
    atualizar_data_inicio.value = "";
    atualizar_data_fim.value = "";
    atualizar_status.value = "";
    atualizar_tempo.value = "";
    atualizar_url.value = "";
}


// Evento para limpar os inputs do cadastrar
cadastro_btn_limpar.addEventListener("click", () => {
    // Chama a função para limpar os campos
    limparFormularioCadastro();
});

// Evento para limpar os inputs do Atualizar
atualizar_btn_limpar.addEventListener("click", () => {
    // Chama a função para limpar os campos
    limparFormularioAtualizacao();
});

// Copyright @ 2023
console.log("        /\\_/\\ Copyright © 2023");
console.log("       ( o.o ) Otávio, Breno, Isa e Kauana.");
console.log("        > ^ < Todos os direitos reservados.");
console.log("       >     <  SEMPRE OLHAR AS ANOTAÇÕES")
