const userForm = document.getElementById('userForm');

userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const firstName = e.target.firstName.value;
  const lastName = e.target.lastName.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const role = e.target.role.value;

  const user = {
    firstName,
    lastName,
    email,
    password,
    role,
  };

  const response = await fetch('http://localhost:3000/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (response.status === 201) {
    alert('Usuario creado correctamente');
    window.location.href = 'login.html';
    return;
  }

  alert('Error al crear el usuario, intente nuevamente');
  return;
});
