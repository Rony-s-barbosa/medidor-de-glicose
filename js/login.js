document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('senha');
    const loginForm = document.getElementById('login-form');
  
    // Função para alternar a visibilidade da senha
    togglePassword.addEventListener('click', () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      togglePassword.innerHTML = type === 'password' ? '&#128065;' : '&#128064;';
    });
  
    // Evento de submissão do formulário
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Previne o comportamento padrão do formulário
  
      // Aqui você pode adicionar a lógica de validação do login
  
      // Redireciona para a página index.html
      window.location.href = 'index.html';  // Caminho para a página inicial
    });
  });
  