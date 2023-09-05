function ocultar_divs() {
    document.getElementById("tela_cadastro").style.display = "none"
    document.getElementById("tela_editar").style.display = "none"

}

// Ocultar div id_div
function ocultar_div(id_div) {
    document.getElementById(id_div).style.display = "none"

}

// Mostrar div id_div
function mostrar_div(id_div) {
    document.getElementById(id_div).style.display = "flex"
}

// Adicionar Filme
function btn_onclick_adicionar() {
    
    let titulo = document.getElementById("titulo").value
    let end_imagem = document.getElementById("end_imagem").value
    let descricao = document.getElementById("descricao").value
    
    let dados_filme = [titulo, end_imagem , descricao]
    array_galeria.push(dados_filme)
    
}


// Mostrar cadastro 
function btn_cadastro() {
    ocultar_divs()
    mostrar_div("tela_cadastro")
}

// Mostrar Lista
function btn_gerenciar() {
    ocultar_divs()
    mostrar_div("tela_listar")

    let tela = document.getElementById("galeria")
    tela.innerHTML = ""
    let conteudo_html = ""

    dados_filme = []

    for (let i = 0; i < array_galeria.length; i++) {
        

        let titulo = array_galeria[i][0]
        let end_imagem = array_galeria[i][1]
        let descricao = array_galeria[i][2]
        
        conteudo_html += `<div class = "container-filme">
                                <img src = "${end_imagem}"/>
                                <h2>${titulo}</h2>
                                <p>${descricao}</p>
                            </div>`

    }
    galeria.innerHTML += conteudo_html
}





// // Adicionar Filme
// function btn_onclick_adicionar_filme() {

//     let titulo = document.getElementById("titulo").value
//     let end_imagem = document.getElementById("end_imagem").value
//     let descricao = document.getElementById("descricao").value

//     let dados_filme = [titulo, end_imagem , descricao]
//     array_galeria.push(dados_filme)

// }

// // Mostrar cadastro 
// function btn_onclick_mostrar_cadastro() {
//     ocultar_divs()
//     mostrar_div("tela_cadastro")
// }

// // Mostrar Lista
// function btn_onclick_mostrar_listar() {
//     ocultar_divs()
//     mostrar_div("tela_listar")

//     let tela = document.getElementById("galeria")
//     tela.innerHTML = ""
//     let conteudo_html = ""

//     dados_filme = []

//     for (let i = 0; i < array_galeria.length; i++) {
        

//         let titulo = array_galeria[i][0]
//         let end_imagem = array_galeria[i][1]
//         let descricao = array_galeria[i][2]
        
//         conteudo_html += `<div class = "container-filme">
//                                 <img src = "${end_imagem}"/>
//                                 <h2>${titulo}</h2>
//                                 <p>${descricao}</p>
//                             </div>`

//     }
//     galeria.innerHTML += conteudo_html
// }

// // Mostrar remover 
// function btn_onclick_mostrar_remover() {
//     ocultar_divs()
//     mostrar_div("tela_remover")

//     let tela1 = document.getElementById("tela_remover")
//     tela1.innerHTML = ""

//     let conteudo1_html = ""

//     for (let i = 0; i < array_galeria.length; i++) {
        
//         conteudo1_html += `
//                             <button  class = "vermelho" onclick="removerFilme(${i})">${array_galeria[i][0]}</button>
//                         `
        
//     }
//     tela1.innerHTML += conteudo1_html
// }

// // Remover Filme indice
// function removerFilme(indice_a_remover) {
//     array_galeria.splice(indice_a_remover, 1)
//     btn_onclick_mostrar_remover()
// }

// // Botão Limpar
// function btn_onclick_limpar(){
//     let textoreti = document.getElementById("titulo")
//     let imagemreti = document.getElementById("end_imagem")
//     let descricaoreti = document.getElementById("descricao")

//     textoreti.value = "";
//     imagemreti.value = "";
//     descricaoreti.value = "";


// }

// // Mostar Editar
// function btn_onclick_mostrar_editar() {
//     ocultar_divs()
//     mostrar_div("tela_editar")
//     mostrar_div("tela_editar_listagem")

//     let html = ""
//     for (let i = 0; i < array_galeria.length; i++) {
        
//         html += `<button id="${i}" class="amarelo" onclick="btn_onclick_editar_form(${i})">${array_galeria[i][0]}</button>`
        
//     }
//     document.getElementById("tela_editar_listagem").innerHTML = html


// }

// // Editar Formulario
// function btn_onclick_editar_form(indice_editar_formulario){
//     ocultar_divs()
//     mostrar_div("tela_editar")
//     mostrar_div("tela_editar_formulario")
    
//     indice_filme = indice_editar_formulario

//     let filme_editar = array_galeria[indice_editar_formulario]
//     document.getElementById("edit_titulo").value = filme_editar[0]
//     document.getElementById("edit_end_imagem").value = filme_editar[1]
//     document.getElementById("edit_descricao").value = filme_editar[2]

// }

// // Salvar Alteração 
// function btn_onclick_alteracoes_filme() {
//     let titulo = document.getElementById("edit_titulo").value
//     let end_imagem = document.getElementById("edit_end_imagem").value
//     let descricao = document.getElementById("edit_descricao").valu

//     let filme = [titulo, end_imagem, descricao]

//     array_galeria[indice_filme] = filme

//     btn_onclick_mostrar_listar()

// }


