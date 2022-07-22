const newPorductForm = document.getElementById('newProductForm');

const checkIfLogged = async (email, password) => {
  const response = await fetch(
    'http://127.0.0.1:3000/api/v1/users/authentication',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (response.status === 200) {
    return true;
  }
  return false;
};

newPorductForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const description = e.target.description.value;
  const price = e.target.price.value;
  const category = e.target.category.value;
  const image = e.target.image.files[0];

  const formData = new FormData();

  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('category', category);
  formData.append('image', image);

  const response = await fetch('http://127.0.0.1:3000/api/v1/products', {
    method: 'POST',
    body: formData,
  })

  if (response.status === 201) {
    window.location.href = 'panelAdmin.html';
    return
  }

  alert('Error al crear el producto, intente nuevamente');
  newPorductForm.reset();
  return
});

const init = async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const userLogged = await checkIfLogged(user.email, user.password);

  if (!userLogged) {
    window.location.href = 'login.html';
    return;
  }

};

init();
