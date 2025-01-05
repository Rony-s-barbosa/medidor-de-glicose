// Função para formatar a data no formato dia-mês-ano
function formatarData(data) {
  const dateObject = new Date(data);
  const dia = String(dateObject.getDate()).padStart(2, "0");
  const mes = String(dateObject.getMonth() + 1).padStart(2, "0"); // Meses começam do 0
  const ano = dateObject.getFullYear();
  return `${dia}-${mes}-${ano}`; // Formato dia-mês-ano
}

// Manipulando o envio do formulário
document.getElementById('form-glicose').addEventListener('submit', function(event) {
  event.preventDefault();

  const valor = document.getElementById('valor').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;
  const observacao = document.getElementById('observacao').value;

  if (!valor || !data || !hora) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  
  // Formatando a data antes de salvar
  const dataFormatada = formatarData(data);

  registros.push({ valor, data: dataFormatada, hora, observacao });
  localStorage.setItem('registros', JSON.stringify(registros));

  // Atualiza o histórico
  atualizarHistorico();

  // Limpar formulário
  document.getElementById('form-glicose').reset();
});

function atualizarHistorico() {
  const registros = JSON.parse(localStorage.getItem('registros')) || [];
  const listaHistorico = document.getElementById('lista-historico');
  listaHistorico.innerHTML = '';

  registros.forEach((registro, index) => {
    const li = document.createElement('li');
    li.textContent = `${registro.data} ${registro.hora} - ${registro.valor} mg/dL (${registro.observacao})`;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.addEventListener('click', () => {
      registros.splice(index, 1);
      localStorage.setItem('registros', JSON.stringify(registros));
      atualizarHistorico();
    });

    li.appendChild(btnRemover);
    listaHistorico.appendChild(li);
  });
}

// Atualizar o histórico ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarHistorico);
