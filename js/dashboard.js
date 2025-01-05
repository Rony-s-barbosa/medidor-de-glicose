// Configuração inicial
let anoAtual = new Date().getFullYear();
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

window.onload = () => {
  atualizarAno();
  criarGradeMeses();
};

// Atualizar o ano exibido
function atualizarAno() {
  document.getElementById("ano-atual").textContent = anoAtual;
}

// Navegação entre anos
document.getElementById("ano-anterior").addEventListener("click", () => {
  anoAtual--;
  atualizarAno();
});

document.getElementById("ano-posterior").addEventListener("click", () => {
  anoAtual++;
  atualizarAno();
});

// Criar grade de meses
function criarGradeMeses() {
  const container = document.querySelector(".meses-flutuantes");
  container.innerHTML = ""; // Limpar meses anteriores

  meses.forEach((mes, index) => {
    const botaoMes = document.createElement("button");
    botaoMes.textContent = mes;
    botaoMes.addEventListener("click", () => mostrarDias(index));
    container.appendChild(botaoMes);
  });
}

// Mostrar dias do mês selecionado
function mostrarDias(mesIndex) {
  document.getElementById("grade-meses").classList.add("oculto");
  document.getElementById("calendario-dias").classList.remove("oculto");

  const tituloMes = document.getElementById("titulo-mes");
  tituloMes.textContent = `${meses[mesIndex]} ${anoAtual}`;

  const diasContainer = document.querySelector(".dias-grid");
  diasContainer.innerHTML = ""; // Limpar dias anteriores

  const diasNoMes = new Date(anoAtual, mesIndex + 1, 0).getDate();
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const data = new Date(anoAtual, mesIndex, dia);
    const botaoDia = document.createElement("button");
    botaoDia.textContent = `${dia} (${data.toLocaleDateString("pt-BR", { weekday: "short" })})`;
    botaoDia.addEventListener("click", () => mostrarGrafico(dia, mesIndex));
    diasContainer.appendChild(botaoDia);
  }
}

// Mostrar gráfico do dia selecionado
function mostrarGrafico(dia, mesIndex) {
  // Limpar gráfico anterior
  const ctx = document.getElementById("grafico").getContext("2d");
  const graficoExistente = Chart.getChart("grafico");
  if (graficoExistente) {
    graficoExistente.destroy(); // Remover gráfico anterior
  }

  document.getElementById("calendario-dias").classList.add("oculto");
  document.getElementById("grafico-dia").classList.remove("oculto");

  const tituloDia = document.getElementById("titulo-dia");
  tituloDia.textContent = `Glicose - ${dia} de ${meses[mesIndex]} de ${anoAtual}`;

  const registros = JSON.parse(localStorage.getItem("registros")) || [];
  const registrosDia = registros.filter(registro => {
    const [ano, mes, diaRegistro] = registro.data.split("-").map(Number);
    return ano === anoAtual && mes - 1 === mesIndex && diaRegistro === dia;
  });

  const horas = registrosDia.map(registro => registro.hora);
  const valores = registrosDia.map(registro => registro.valor);

  // Criar novo gráfico
  new Chart(ctx, {
    type: "line",
    data: {
      labels: horas,
      datasets: [{
        label: "Glicose (mg/dL)",
        data: valores,
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
        fill: false,
      }],
    },
    options: {
      scales: {
        x: { title: { display: true, text: "Horário" } },
        y: { title: { display: true, text: "Valor de Glicose (mg/dL)" }, beginAtZero: true },
      },
    },
  });
}

// Voltar para meses
document.getElementById("voltar-meses").addEventListener("click", () => {
  document.getElementById("calendario-dias").classList.add("oculto");
  document.getElementById("grade-meses").classList.remove("oculto");
});

// Voltar para dias
document.getElementById("voltar-dias").addEventListener("click", () => {
  document.getElementById("grafico-dia").classList.add("oculto");
  document.getElementById("calendario-dias").classList.remove("oculto");
});
