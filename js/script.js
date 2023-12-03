// URL
const URL_API = "http://10.111.9.16:3000";

// Variáveis para a Navbar
const btnCadastrar = document.getElementById("btn_Cadastrar");
const btnAtualizar = document.getElementById("btn_Atualizar");
const btnBusca = document.getElementById("btn_Busca");
const btnExibir = document.getElementById("btn_Exibir");

// Função para mostrar/ocultar divs
function mostrarDiv(id) {
    // Obtém todas as divs
    var divs = document.querySelectorAll('.content');

    // Oculta todas as outras divs
    divs.forEach(div => {
        if (div.id !== id) {
            div.style.display = 'none';
        }
    });

    // Obtém a div desejada
    var div = document.getElementById(id);

    // Alterna a visibilidade da div
    div.style.display = div.style.display === 'block' ? 'none' : 'block';
}


// Função para limpar os campos do formulário de cadastro
function limparFormularioCadastro() {
    // Limpar os campos conforme necessário
    cadastro_nome_midia.value = "";
    cadastro_tipo.value = "";
    cadastro_data_inicio.value = "";
    cadastro_data_fim.value = "";
    cadastro_status.value = "";
    cadastro_tempo.value = "";
    cadastro_url.value = "";
}

// Função para limpar os campos do formulário de atualização
function limparFormularioAtualizacao() {
    // Limpar os campos conforme necessário
    atualizar_nome_midia.value = "";
    atualizar_tipos.value = "";
    atualizar_data_inicio.value = "";
    atualizar_data_fim.value = "";
    atualizar_status.value = "";
    atualizar_tempo.value = "";
    atualizar_url.value = "";
    atualizar_id_editar.value = "";
}

// Evento cadastrar
btnCadastrar.addEventListener("click", async () => {
    try {
        const nome = cadastro_nome_midia.value;
        const tipo = cadastro_tipo.value;
        const data_inicio = cadastro_data_inicio.value;
        const data_fim = cadastro_data_fim.value;
        const status = cadastro_status.value;
        const tempo = cadastro_tempo.value;
        const url = cadastro_url.value;

        const response = await fetch(`${URL_API}/api/midia_indoor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: nome,
                tipo: tipo,
                data_inicio: data_inicio,
                data_fim: data_fim,
                status: status,
                tempo: tempo,
                url: url,
            }),
        });

        if (resposta && resposta.ok) {
            mostrarDiv('divResultado'); // Mostrar a div desejada após buscar
            atualizarTabela(array_resultado);
        } else {
            console.error("Erro ao buscar.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
});

// Evento buscar
busca_btn_verificar.addEventListener("click", async () => {
    try {
        const busca = input_busca.value;
        const opcao = busca_opcoes.value;

        let resposta = null;

        if (opcao === "todos") {
            resposta = await fetch(`${URL_API}/api/midia_indoor`);
        } else if (opcao === "id") {
            resposta = await fetch(`${URL_API}/api/midia_indoor/id/${busca}`);
        } else if (opcao === "nome") {
            resposta = await fetch(`${URL_API}/api/midia_indoor/nome/${busca}`);
        }

        if (resposta && resposta.ok) {
            const array_resultado = await resposta.json();
            atualizarTabela(array_resultado);
        } else {
            console.error("Erro ao buscar.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
});

// Função para atualizar a tabela de busca
function atualizarTabela(data) {
    const tbody = document.getElementById("busca_saida");

    let html = `<table class="table">
                    <thead>
                        <tr>    
                            <th scope="col">id</th>
                            <th scope="col" class='text-start'>Nome</th>
                            <th scope="col" class='text-start'>Url</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Excluir</th>
                        </tr>
                    </thead>
                    <tbody>`;

    if (Array.isArray(data)) {
        data.forEach((item) => {
            html += `<tr>
                        <td>${item.id}</td>
                        <td class='text-start'>${item.nome}</td>
                        <td class='text-start'>${item.url}</td>
                        <td><i onclick="editar(${item.id})" class="bi bi-pencil"></i></td>
                        <td><i onclick="excluir(${item.id})" class="bi bi-trash"></i></td>
                    </tr>`;
        });
    } else {
        html += `<tr>
                    <td>${data.id}</td>
                    <td class='text-start'>${data.nome}</td>
                    <td class='text-start'>${data.url}</td>
                    <td><i onclick="editar(${data.id})" class="bi bi-pencil"></i></td>
                    <td><i onclick="excluir(${data.id})" class="bi bi-trash"></i></td>
                </tr>`;
    }

    html += `</tbody></table>`;

    tbody.innerHTML = html;
}

// Evento para atualizar os dados
atualizar_btn_dados.addEventListener("click", async () => {
    try {
        const id = atualizar_id_editar.value;
        const nome_atualizado = atualizar_nome_midia.value;
        const tipo_atualizado = atualizar_tipos.value;
        const data_inicio_atualizado = atualizar_data_inicio.value;
        const data_fim_atualizado = atualizar_data_fim.value;
        const status_atualizado = atualizar_status.value;
        const tempo_atualizado = atualizar_tempo.value;
        const url_atualizado = atualizar_url.value;

        const response = await fetch(`${URL_API}/api/midia_indoor`, {
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
                url: url_atualizado,
            }),
        });

        if (response.ok) {
            mostrarDiv('divBusca'); // Mostrar a div desejada após atualizar
            busca_btn_verificar.click();
            limparFormularioAtualizacao();
        } else {
            console.error("Erro ao atualizar.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
});

// Evento para excluir dados
excluir_btn_dados.addEventListener("click", async () => {
    try {
        const id = atualizar_id_editar.value;

        const response = await fetch(`${URL_API}/api/midia_indoor/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            mostrarDiv('divBusca'); // Mostrar a div desejada após excluir
            busca_btn_verificar.click();
            limparFormularioAtualizacao();
        } else {
            console.error("Erro ao excluir.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
});


// Função para editar dados
function editar(id) {
    try {
        fetch(`${URL_API}/api/midia_indoor/id/${id}`)
            .then(response => response.json())
            .then(data => {
                atualizar_id_editar.value = data.id;
                atualizar_nome_midia.value = data.nome;
                atualizar_tipos.value = data.tipo;
                atualizar_data_inicio.value = data.data_inicio;
                atualizar_data_fim.value = data.data_fim;
                atualizar_status.value = data.status;
                atualizar_tempo.value = data.tempo;
                atualizar_url.value = data.url;
            });
            mostrarDiv('divAtualizar'); // Mostrar a div desejada ao editar
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }

// Função para excluir dados
function excluir(id) {
    if (confirm("Deseja realmente excluir?")) {
        try {
            fetch(`${URL_API}/api/midia_indoor/${id}`, {
                method: "DELETE",
            })
                .then(response => response.json())
                .then(data => {
                    btn_Busca.click();
                    busca_btn_verificar.click();
                    limparFormularioAtualizacao();
                });
                mostrarDiv('divBusca'); // Mostrar a div desejada após confirmar a exclusão
            } catch (error) {
                console.error("Erro na requisição:", error);
            }
        }
    }