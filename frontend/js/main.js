document.addEventListener('DOMContentLoaded', function() {
const baseURL = 'http://localhost:3001';
// Função para registrar um novo usuário
  async function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await axios.post(${baseURL}/register, { name, email, password });
      if (response.data) {
        alert('Usuário registrado com sucesso!');
        window.location.href = 'login.html';
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      alert('Erro ao registrar usuário.');
    }
  }

  const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', registerUser);
  }
// Função para autenticar um usuário
  async function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await axios.post(${baseURL}/login, { email, password });
      if (response.data.success) {
        alert('Login realizado com sucesso!');
        window.location.href = 'admin.html';
      } else {
        alert('Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login.');
    }
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', loginUser);
  }











  
});
