// URL
const URL_API = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let resposta = await fetch(`${URL_API}/api/midia_indoor`);
    if (resposta.ok) {
      let dados = await resposta.json();

      const carousel = document.getElementById("carousel_midia");
      let currentIndex = 0; // Índice da mídia atual no array

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
          if (tipo_midia === 'T') {
            // Se for uma imagem
            div.innerHTML = `<img src="${url_midia}" data-tempo="${tempo_exibicao}">`;
          } else {
            // Verifica se é um vídeo do YouTube
            if (isYouTubeURL(url_midia)) {
              // Se for um vídeo do YouTube, usa a API de incorporação do YouTube para embutir o vídeo
              embedYouTubeVideo(url_midia, div);
            } else if (tipo_midia === 'V') {
              // Se não for um vídeo do YouTube e for um vídeo local
              div.innerHTML = `<video src="${url_midia}" data-tempo="${tempo_exibicao}" muted autoplay onended="mostrarProximaMidia()"></video>`;
            } else {
              // Se for outro tipo de mídia, pule para o próximo item
              mostrarProximaMidia();
              return;
            }
          }

          carousel.appendChild(div);
          currentIndex = (currentIndex + 1) % dados.length; // Avança para a próxima mídia no array
          setTimeout(mostrarProximaMidia, tempo_exibicao); // Define o tempo para mostrar a próxima mídia
        } else {
          // Se a mídia não estiver ativa ou fora do período, vá para a próxima
          currentIndex = (currentIndex + 1) % dados.length;
          mostrarProximaMidia();
        }
      }

      // Função para verificar se a URL é do YouTube
      function isYouTubeURL(url) {
        const youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\?v=|embed\/|v\/)?|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
        return youtubePattern.test(url);
      }

      // Função para embutir o vídeo do YouTube usando a API de incorporação do YouTube
      function embedYouTubeVideo(youtubeUrl, containerElement) {
        const videoId = getYouTubeVideoId(youtubeUrl);
        if (videoId) {
          const iframe = document.createElement('iframe');
          iframe.src = `https://www.youtube.com/embed/${videoId}`;
          iframe.width = '560';
          iframe.height = '315';
          iframe.frameBorder = '0';
          iframe.allowFullscreen = true;
          containerElement.appendChild(iframe);
        } else {
          // Se não for possível obter o ID do vídeo do YouTube, pule para o próximo item
          mostrarProximaMidia();
        }
      }

      // Função para obter o ID do vídeo do YouTube a partir da URL
      function getYouTubeVideoId(url) {
        const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
      }

      // Inicia o carrossel
      mostrarProximaMidia();

    }
  } catch (error) {
    console.error("Erro ao obter dados da API:", error);
  }
});
