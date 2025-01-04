document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-form');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
      const confirmaSenha = document.getElementById('confirma-senha').value;
  
      if (senha !== confirmaSenha) {
        alert('As senhas não coincidem!');
        return;
      }
  
      // Simula o salvamento do cadastro no LocalStorage
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      usuarios.push({ nome, email, senha });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
      alert('Cadastro realizado com sucesso!');
      window.location.href = "login.html"; // Redireciona para a página de login
    });
  });
  