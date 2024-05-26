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
          // Cria a barra de progresso
          const progressBar = document.createElement("div");
          progressBar.className = "progress-bar";
          progressBar.style.transitionDuration = `${tempo_exibicao / 1000}s`; // Define a duração da animação

          if (tipo_midia === 'I') {
            // Se for uma imagem
            div.innerHTML = `<img src="midias/${url_midia}" data-tempo="${tempo_exibicao}">`;
          } else if (tipo_midia === 'V') {
            // Se for um vídeo local
            if (tempo_exibicao === 0) {
              // Se o tempo de exibição for 0, definimos o tempo de exibição como a duração real do vídeo
              let video = document.createElement("video");
              video.src = `midias/${url_midia}`;
              video.muted = true;
              video.autoplay = true;
              video.onended = mostrarProximaMidia;
              div.appendChild(video);

              // Obtém a duração do vídeo e define como tempo de exibição
              video.onloadedmetadata = function() {
                tempo_exibicao = video.duration * 1000; // Convertendo para milissegundos
                progressBar.style.transitionDuration = `${tempo_exibicao / 1000}s`; // Atualiza a duração da barra de progresso
                setTimeout(() => {
                  progressBar.style.width = "100%";
                }, 50); // Adiciona um pequeno atraso para garantir que a largura da barra de progresso seja atualizada após a adição ao DOM
              };
            } else {
              // Se o tempo de exibição não for 0, exibe o vídeo normalmente
              div.innerHTML = `<video src="midias/${url_midia}" data-tempo="${tempo_exibicao}" muted autoplay onended="mostrarProximaMidia()"></video>`;
            }
          } else {
            // Se for outro tipo de mídia, pule para o próximo item
            mostrarProximaMidia();
            return;
          }

          div.appendChild(progressBar);
          carousel.appendChild(div);

          // Reconfigura a largura da barra de progresso para 0
          progressBar.style.width = "0";

          // Atualiza a largura da barra de progresso para preencher completamente
          setTimeout(() => {
            progressBar.style.width = "100%";
          }, 50); // Adiciona um pequeno atraso para garantir que a largura da barra de progresso seja atualizada após a adição ao DOM

          // Reinicia a barra de progresso quando uma nova mídia é exibida
          setTimeout(() => {
            progressBar.style.width = "0";
          }, tempo_exibicao);

          currentIndex = (currentIndex + 1) % dados.length;
          setTimeout(mostrarProximaMidia, tempo_exibicao);
        } else {
          currentIndex = (currentIndex + 1) % dados.length;
          mostrarProximaMidia();
        }

        // Verifica se a exibição atual é a última mídia
        if (currentIndex === 0) {
          // Adiciona um pequeno atraso antes de recarregar a página para garantir que o último item seja exibido completamente
          setTimeout(() => {
            // Recarrega a página após o término do ciclo do carrossel
            location.reload();
          }, tempo_exibicao);
        }
      }

      // Inicia o carrossel
      mostrarProximaMidia();

    }
  } catch (error) {
    console.error("Erro ao obter dados da API:", error);
  }
});
