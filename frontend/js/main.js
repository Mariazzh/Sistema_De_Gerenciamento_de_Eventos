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
// Função para carregar convidados
  async function loadGuests() {
    try {
      const response = await axios.get(${baseURL}/guests);
      const guests = response.data;
      const guestsTable = document.getElementById('guestsTable');
      guestsTable.innerHTML = '';
      guests.forEach(guest => {
        const row = `<tr>
          <td>${guest.name}</td>
          <td>${guest.email}</td>
          <td>${guest.event}</td>
          <td>
            <button onclick="editGuest('${guest._id}')" class="btn btn-warning">Editar</button>
            <button onclick="deleteGuest('${guest._id}')" class="btn btn-danger">Excluir</button>
          </td>
        </tr>`;
        guestsTable.innerHTML += row;
      });
    } catch (error) {
      console.error('Erro ao carregar convidados:', error);
    }
  }
// Função para adicionar um novo convidado
  async function addGuest(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const eventField = document.getElementById('event').value;

    try {
      await axios.post(${baseURL}/guests, { name, email, event: eventField });
      loadGuests();
    } catch (error) {
      console.error('Erro ao adicionar convidado:', error);
    }
  }

  const guestForm = document.getElementById('guestForm');
  if (guestForm) {
    guestForm.addEventListener('submit', addGuest);
  }
// Função para editar um convidado
  async function editGuest(id) {
    const name = prompt('Novo nome:');
    const email = prompt('Novo email:');
    const eventField = prompt('Novo evento:');
    try {
      await axios.put(${baseURL}/guests/${id}, { name, email, event: eventField });
      loadGuests();
    } catch (error) {
      console.error('Erro ao editar convidado:', error);
    }
  }

  // Função para excluir um convidado
  async function deleteGuest(id) {
    try {
      await axios.delete(${baseURL}/guests/${id});
      loadGuests();
    } catch (error) {
      console.error('Erro ao excluir convidado:', error);
    }
  }

  // Carregar convidados ao carregar a página de administração
  const guestsTable = document.getElementById('guestsTable');
  if (guestsTable) {
    loadGuests();
  }
  
});
