const bolasCores = document.querySelectorAll('.ball');
const corDaResposta = document.querySelector('#rgb-color');
const paragrafoResposta = document.querySelector('#answer');
const paragrafoPlacar = document.querySelector('#score');
const botaoReset = document.querySelector('#reset-game');
const botaoResetscore = document.querySelector('#reset-score');
// const botaoAumentaDificuldade = document.querySelector('#dif-up');
// const botaoDiminuiDificuldade = document.querySelector('#dif-down');
// const containerCores = document.querySelector('#color-container');

function gerarCoresAleatorias() {
  const red = Math.ceil(Math.random() * 255);
  const green = Math.ceil(Math.random() * 255);
  const blue = Math.ceil(Math.random() * 255);

  return `rgb(${red} , ${green} , ${blue})`;
}

function escolherResposta() {
  const teste = Math.ceil(Math.random() * 5);
  let corSemRGB = `${bolasCores[teste].style.backgroundColor}`;
  corSemRGB = corSemRGB.replace('rgb', '');
  corDaResposta.innerText = `${corSemRGB}`;
}

function gerarPlacar(placar) {
  let soma = placar;
  soma += 3;
  localStorage.setItem('placar', soma);
}

function clicarNaResposta(element) {
  element.addEventListener('click', (event) => {
    if (event.target.style.backgroundColor === `rgb${corDaResposta.innerText}`) {
      paragrafoResposta.innerText = 'Acertou!';
      let sum = 0;
      if (localStorage.getItem('placar') !== null) {
        sum = parseInt(localStorage.getItem('placar'), 10);
      }
      gerarPlacar(sum);
      paragrafoPlacar.innerText = localStorage.getItem('placar');
    } else paragrafoResposta.innerText = 'Errou! Tente novamente!';
  });
}

function recarregarPagina() {
  botaoReset.addEventListener('click', () => {
    window.location.reload();
  });
}

recarregarPagina();

function resetarPlacar() {
  botaoResetscore.addEventListener('click', () => {
    localStorage.setItem('placar', 0);
    paragrafoPlacar.innerText = localStorage.getItem('placar');
  });
}

resetarPlacar();

// function aumentaDificuldade() {
//   botaoAumentaDificuldade.addEventListener('click', () => {
//     const novaDiv = document.createElement('div');
//     containerCores.appendChild(novaDiv);
//     const divs = document.querySelectorAll('#color-container div');
//     for (index = 0; index < 6; index += 1){
//       const novaDivParaCor = document.createElement('div');
//       novaDivParaCor.classList.add('ball');
//       novaDivParaCor.style.backgroundColor = gerarCoresAleatorias();
//       clicarNaResposta(novaDivParaCor);
//       divs[divs.length - 1].appendChild(novaDivParaCor);
//     }
//     escolherResposta();
//   });
// }

// aumentaDificuldade();

window.onload = () => {
  for (let index = 0; index < bolasCores.length; index += 1) {
    bolasCores[index].style.backgroundColor = gerarCoresAleatorias();
    clicarNaResposta(bolasCores[index]);
  }
  escolherResposta();

  paragrafoPlacar.innerText = 0;
  if (localStorage.getItem('placar') !== null) {
    paragrafoPlacar.innerText = localStorage.getItem('placar');
  }
};
