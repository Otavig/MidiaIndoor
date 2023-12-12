// URL
const URL_API = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let resposta = await fetch(`${URL_API}/api/midia_indoor`);
    if (resposta.ok) {
      let dados = await resposta.json();
      console.log(dados)

      const carousel = document.getElementById("carousel_midia");
      let currentIndex = 0; // Índice da mídia atual no array

      function goFullscreen(iframe) {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
          iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) {
          iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
          iframe.msRequestFullscreen();
        }
      }

      function isYouTubeURL(url) {
        return url.toLowerCase().includes("youtube.com");
      }

      function mostrarProximaMidia() {
        // Remove a mídia atual do carrossel
        carousel.innerHTML = '';

        const midiaAtual = dados[currentIndex];
        let url_midia = midiaAtual.url;
        let tipo_midia = midiaAtual.tipo;
        let tempo_exibicao = midiaAtual.tempo;
        let status_midia = midiaAtual.status.toLowerCase();
        let data_inicio = new Date(midiaAtual.data_inicio);
        let data_fim = new Date(midiaAtual.data_fim);
        let data_atual = new Date();

        // Formatação da data para o formato "YYYY-MM-DD"
        let data_atual_formatada = parseInt(new Date(data_atual).toISOString().slice(0, 10).replace(/-/g, ''));
        let data_inicio_formatada = parseInt(data_inicio.toISOString().slice(0, 10).replace(/-/g, ''));
        let data_fim_formatada = parseInt(data_fim.toISOString().slice(0, 10).replace(/-/g, ''));

        console.log(`URL: ${url_midia}, Tipo: ${tipo_midia}, Tempo de Exibição: ${tempo_exibicao} segundos, Status: ${status_midia}, Data Inicial: ${data_inicio_formatada}, Data do fim ${data_fim_formatada} e Data de hoje ${data_atual_formatada}`);

        const div = document.createElement("div");
        div.className = "carousel-item";

        // Verifica se a mídia está ativa e se a data atual está entre a data de início e de término
        if (status_midia === 'a' && data_atual_formatada >= data_inicio_formatada && data_atual_formatada <= data_fim_formatada) {
          if (tipo_midia === 'I') {
            // Se for uma imagem
            div.innerHTML = `<img src="${url_midia}" data-tempo="${tempo_exibicao}">`;
          } else if (tipo_midia === 'V') {
            // Se for um vídeo local
            if (isYouTubeURL(url_midia)) {
              // Se for um vídeo do YouTube, usa a API de incorporação do YouTube para embutir o vídeo
              div.innerHTML = `<iframe width="100%" height="100%" src="${url_midia}" frameborder="0" allowfullscreen></iframe>`;
              const iframe = div.querySelector('iframe');
              goFullscreen(iframe);
            } else {
              // Se não for um vídeo do YouTube e for um vídeo local
              div.innerHTML = `<video src="${url_midia}" data-tempo="${tempo_exibicao}" muted autoplay onended="mostrarProximaMidia()"></video>`;
            }
          } else {
            // Se for outro tipo de mídia, pule para o próximo item
            mostrarProximaMidia();
            return;
          }

          carousel.appendChild(div);
          currentIndex = (currentIndex + 1) % dados.length;
          setTimeout(mostrarProximaMidia, tempo_exibicao);
        } else {
          currentIndex = (currentIndex + 1) % dados.length;
          mostrarProximaMidia();
        }
      }

      // Inicia o carrossel
      mostrarProximaMidia();

    }
  } catch (error) {
    console.error("Erro ao obter dados da API:", error);
  }
});
