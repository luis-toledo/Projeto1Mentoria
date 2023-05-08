const inputs = document.querySelectorAll("[data-input]");
const button = document.querySelector("[data-button");

const dia = document.querySelector("[data-dia]");
const mes = document.querySelector("[data-mes]");
const ano = document.querySelector("[data-anos]");

const date = new Date();
const anoAtual = date.getFullYear();

let diaDigitado;
let mesDigitado;
let anoDigitado;

button.addEventListener("click", () => {
  let erro = 0;
  erro = passaDataSet();
  erro += validaVazio();
  if (erro != 0) {
    dia.textContent = "- -";
    mes.textContent = "- -";
    ano.textContent = "- -";
    return;
  } else {
    //faz o calculo
    inputs.forEach((elemento) => {
      DefineVariaveis(elemento.dataset.input, elemento.value);
    });
    calculo();
  }
});

inputs.forEach((elemento) => {
  elemento.addEventListener("input", (elemento) => {
    if (elemento.target.value.trim() != "") {
      elemento.target.classList.replace("desabilitado", "input");
    }
  });
});

function passaDataSet() {
  let erro = 0;
  inputs.forEach((elemento) => {
    if (elemento.dataset.input === "dia") {
      if (elemento.value < 1 || elemento.value > 31) {
        elemento.classList.replace("input", "desabilitado");
        erro++;
      }
    } else if (elemento.dataset.input === "mes") {
      if (elemento.value < 1 || elemento.value > 12) {
        elemento.classList.replace("input", "desabilitado");
        erro++;
      }
    } else {
      if (elemento.value > anoAtual) {
        elemento.classList.replace("input", "desabilitado");
        erro++;
      }
    }
  });
  return erro;
}

function validaVazio() {
  let erro = 0;
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === "") {
      inputs[i].classList.replace("input", "desabilitado");
      erro++;
    }
  }
  return erro;
}

function DefineVariaveis(diaMesAno, valor) {
  toString(valor);
  if (diaMesAno === "dia") {
    diaDigitado = valor;
  } else if (diaMesAno === "mes") {
    mesDigitado = valor;
  } else {
    anoDigitado = valor;
  }
}

function calculo() {

 const dataInformada = new Date(mesDigitado + "/" + diaDigitado + "/" + anoDigitado);
  
  const diffTime = Math.abs(dataInformada - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays);
  console.log(((diffDays * 0.0027) % 12) * 0.0027 * 100);

  dia.textContent = Math.round(((diffDays * 0.0027) % 12) * 0.0027 * 100);
  mes.textContent = Math.round((diffDays * 0.0027) / 12);
  ano.textContent = Math.round(diffDays * 0.0027);

  //ano.textContent =  Math.round(diffDays * 0.0027);
  // console.log(diffTime);
}
