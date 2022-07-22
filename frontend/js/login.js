const formLogin = document.getElementById('formLogin');

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const user = {
    email,
    password,
  };

  const response = await fetch(
    'http://127.0.0.1:3000/api/v1/users/authentication',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  );

  const data = await response.json();

  if (response.status === 401) {
    formLogin.reset();
    return alert('Usuario o contraseña incorrectos');
  }

  localStorage.setItem('user', JSON.stringify(data));
  if (data.role === 'admin') {
    return (window.location.href = './panelAdmin.html');
  }

  if (data.role === 'waiter') {
    return (window.location.href = './panelMesas.html');
  }

  if (data.role === 'chef') {
    return (window.location.href = './cocina.html');
  }
});
