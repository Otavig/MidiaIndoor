const URL_API = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let resposta = await fetch(`${URL_API}/api/midia_indoor`);
    if (resposta.ok) {
      let dados = await resposta.json();

      const carousel = document.getElementById("carousel_midia");

      for (const [index, midia] of dados.entries()) {
        let url_midia = midia.url;
        let tipo_midia = midia.tipo;
        let tempo_exibicao = midia.tempo; // Tempo de exibição da mídia
        let status_midia = midia.status.toLowerCase(); // Padroniza para minúsculas
        let data_inicio = new Date(midia.data_inicio);
        let data_fim = new Date(midia.data_fim);
        let data_atual = new Date()

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
          } else if (tipo_midia === 'V') {
            // Se for um vídeo local
            div.innerHTML = `<video src="${url_midia}" data-tempo="${tempo_exibicao}" muted autoplay></video>`;
          } else {
            // Se for outro tipo de mídia, pule para o próximo item
            continue;
          }

          carousel.appendChild(div);
        }        
      }

      iniciarCarousel();
    }
  } catch (error) {
    console.error("Erro ao obter dados da API:", error);
  }
});

function iniciarCarousel() {
  const carousel = document.getElementById("carousel_midia");
  const items = document.querySelectorAll(".carousel-item");
  let currentIndex = 0;

  const proximoSlide = () => {
    currentIndex = (currentIndex + 1) % items.length;
    carousel.style.transition = 'transform 1s ease';
    carousel.style.transform = `translateX(${-currentIndex * 100}%)`;

    setTimeout(() => {
      carousel.style.transition = 'transform 0s linear';
      proximoSlide();
    }, items[currentIndex].querySelector('img, video').getAttribute('data-tempo'));
  };

  // Removido o primeiro slide automático
  setTimeout(proximoSlide, items[currentIndex].querySelector('img, video').getAttribute('data-tempo'));
}
