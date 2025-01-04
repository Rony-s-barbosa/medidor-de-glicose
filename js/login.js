// Mostrar a seção de registro
document.getElementById('show-register').addEventListener('click', function () {
  document.getElementById('login-section').classList.add('hidden');
  document.getElementById('register-section').classList.remove('hidden');
});

// Voltar para a seção de login
document.getElementById('back-to-login').addEventListener('click', function () {
  document.getElementById('register-section').classList.add('hidden');
  document.getElementById('login-section').classList.remove('hidden');
});

// Login
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userFound = users.find(user => user.username === username && user.password === password);

  if (userFound) {
    alert("Login bem-sucedido!");
    window.location.href = "index.html";
  } else {
    alert("Usuário ou senha incorretos.");
  }
});

// Cadastro
document.getElementById('register-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const newUsername = document.getElementById('new-username').value;
  const newPassword = document.getElementById('new-password').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Verifica se o usuário já existe
  if (users.some(user => user.username === newUsername)) {
    alert("Usuário já cadastrado!");
    return;
  }

  users.push({ username: newUsername, password: newPassword });
  localStorage.setItem('users', JSON.stringify(users));

  alert("Usuário cadastrado com sucesso!");
  document.getElementById('register-section').classList.add('hidden');
  document.getElementById('login-section').classList.remove('hidden');
});
