// mudança de cor de fundo
const temaOscuro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
    document.querySelector("#d1-icon").setAttribute("class", "bi bi-sun-fill");
  }
  
  const temaClaro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "light");
    document.querySelector("#d1-icon").setAttribute("class", "bi bi-moon-fill");
  }
  
  const cambiarTema = () => {
    document.querySelector("body").getAttribute("data-bs-theme") === "light" ?
      temaOscuro() : temaClaro();
  }