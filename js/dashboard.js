window.addEventListener('storage', () => {
  atualizarContagens();
  atualizarGrafico();
});

window.onload = function() {
  atualizarContagens();
  atualizarGrafico();
};

function atualizarContagens() {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  let hipoglicemia = 0;
  let hiperglicemia = 0;
  let normal = 0;

  registros.forEach(registro => {
    const valor = parseInt(registro.valor);
    if (valor < 70) hipoglicemia++;
    else if (valor > 180) hiperglicemia++;
    else normal++;
  });

  document.getElementById('contagem-hipoglicemia').textContent = hipoglicemia;
  document.getElementById('contagem-hiperglicemia').textContent = hiperglicemia;
  document.getElementById('contagem-normal').textContent = normal;
}

function atualizarGrafico() {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  const labels = ["06:00", "09:00", "12:00", "15:00", "18:00", "20:00"];
  const glicoseData = [0, 0, 0, 0, 0, 0];
  const glicoseCounts = [0, 0, 0, 0, 0, 0];

  registros.forEach(registro => {
    const hora = parseInt(registro.hora.split(":")[0]);
    let index = Math.floor((hora - 6) / 3);
    if (index >= 0 && index < 6) {
      glicoseData[index] += parseInt(registro.valor);
      glicoseCounts[index]++;
    }
  });

  for (let i = 0; i < glicoseData.length; i++) {
    if (glicoseCounts[i] > 0) glicoseData[i] /= glicoseCounts[i];
  }

  const ctx = document.getElementById('grafico').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Média de Glicose',
        data: glicoseData,
        borderColor: 'rgb(75, 192, 192)',
        fill: false
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
