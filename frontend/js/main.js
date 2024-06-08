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













  
});
