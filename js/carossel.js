// document.addEventListener('DOMContentLoaded', function () {
//     const carrosselDinamico = document.querySelector('#carrosselDinamico .carousel');
//     const progressBar = document.querySelector('#carrosselDinamico .progress-bar');
//     let currentIndex = 0;
//     let tempoTotal = 0;
//     let dadosDoBanco = []; // Adicionado para armazenar os dados carregados do banco

//     async function carregarImagensDoBanco() {
//         try {
//             const response = await fetch('http://localhost:3000/api/midia_indoor/urls');
//             dadosDoBanco = await response.json();

//             for (const dados of dadosDoBanco) {
//                 const divImagem = document.createElement('div');
//                 divImagem.classList.add('carousel-item');

//                 const mediaElement = dados.tipo.includes('video') ? document.createElement('video') : document.createElement('img');
//                 mediaElement.src = dados.url;
//                 mediaElement.alt = 'Midia do Banco de Dados';
//                 mediaElement.classList.add('d-block', 'w-100');
//                 divImagem.appendChild(mediaElement);

//                 carrosselDinamico.appendChild(divImagem);

//                 // Configura um temporizador para remover a div após o tempo definido
//                 setTimeout(() => {
//                     carrosselDinamico.removeChild(divImagem);
//                     updateCarousel();
//                 }, dados.tempo);

//                 // Configura outro temporizador para atualizar a barra de progresso quando a mídia for removida
//                 setTimeout(() => {
//                     updateProgressBar(dados.tempo);
//                 }, dados.tempo - 50); // Subtraindo 50ms para ajustar a sincronização
//             }

//             iniciarCarrosselDinamico();
//         } catch (error) {
//             console.error("Erro ao obter URLs de imagens e vídeos:", error);
//             // Trate o erro conforme necessário (exibindo uma mensagem para o usuário, por exemplo)
//         }
//     }

//     function iniciarCarrosselDinamico() {
//         tempoTotal = dadosDoBanco.reduce((total, item) => total + item.tempo, 0);
//         let tempoAcumulado = 0;

//         for (const dados of dadosDoBanco) {
//             const tempoItem = dados.tempo;

//             setTimeout(() => {
//                 currentIndex = (currentIndex + 1) % dadosDoBanco.length;
//                 updateCarousel();
//             }, tempoAcumulado);

//             // Configura o temporizador para atualizar a barra de progresso com base no tempo acumulado
//             setTimeout(() => {
//                 updateProgressBar(tempoAcumulado);
//             }, tempoAcumulado);

//             tempoAcumulado += tempoItem;
//         }

//         // Reinicia o carrossel dinâmico após completar o ciclo
//         setTimeout(() => {
//             carrosselDinamico.innerHTML = ''; // Limpa o carrossel
//             carregarImagensDoBanco();
//         }, tempoAcumulado);
//     }

//     function updateProgressBar(tempoAcumulado) {
//         const percentualTempo = (tempoAcumulado / tempoTotal) * 100;
//         progressBar.style.width = percentualTempo + '%';
//     }

//     carregarImagensDoBanco();
// });

const URL_API = "http://10.111.14.49:3000";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        let resposta = await fetch(`${URL_API}/api/midia_indoor`);
        if (resposta.ok) {
            let html = ""
            let dados = await resposta.json();
            console.log(resposta);
            for(midia of dados){
                let url_midias = midia.url; 
                console.log(url_midias);

                html += `<div class="carousel-item">
                                <img src="${url_midias}">
                            </div> `;
            }

            document.getElementById("carrosselDinamico").innerHTML = html
        }

    } catch (error) {
        console.error("Erro ao obter dados da API:", error);
    }
    
});
