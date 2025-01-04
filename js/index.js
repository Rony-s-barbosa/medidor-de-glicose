// Armazenando os registros no localStorage (exemplo simples)
const form = document.getElementById('form-glicose');
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const valor = document.getElementById('valor').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  const observacao = document.getElementById('observacao').value;

  // Adicionando o novo registro ao localStorage
  let registros = JSON.parse(localStorage.getItem('registros')) || [];
  registros.push({ valor, data, hora, observacao });
  localStorage.setItem('registros', JSON.stringify(registros));

  // Atualizar o histórico de registros
  atualizarHistorico();
});

// Função para atualizar a lista de registros na página
function atualizarHistorico() {
  const listaHistorico = document.getElementById('lista-historico');
  listaHistorico.innerHTML = '';

  let registros = JSON.parse(localStorage.getItem('registros')) || [];
  registros.forEach(registro => {
    const li = document.createElement('li');
    li.textContent = `Valor: ${registro.valor} mg/dL - Data: ${registro.data} - Hora: ${registro.hora}`;
    listaHistorico.appendChild(li);
  });
}

// Chama a função para mostrar os registros no carregamento
atualizarHistorico();
