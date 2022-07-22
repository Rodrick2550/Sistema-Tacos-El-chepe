// get user data from localstorage
const carouselTacos = document.getElementById('carouselTacosInner');
const carouselQuesadillas = document.getElementById('carouselQuesadillasInner');
const carouselBebidas = document.getElementById('carouselBebidasInner');

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

const getProducts = async () => {
  const response = await fetch('http://127.0.0.1:3000/api/v1/products');
  const data = await response.json();
  return data;
};

const renderProducts = (products) => {
  let firstTaco = true,
    firstQuesadilla = true,
    firstBebida = true;
  let counterTacos = 0,
    counterQuesadillas = 0,
    counterBebidas = 0;
  let carouselItemTacos = '',
    carouselItemQuesadillas = '',
    carouselItemBebidas = '';
  let cardsWrapperTacos = '',
    cardsWrapperQuesadillas = '',
    cardsWrapperBebidas = '';

  if (products.length > 0) {
    products.map((product) => {
      if (product.category === 'tacos') {
        if (counterTacos === 0 || counterTacos === 4) {
          carouselItemTacos = document.createElement('div');

          if (firstTaco) {
            carouselItemTacos.className = 'carousel-item active';
            firstTaco = false;
          } else {
            carouselItemTacos.className = 'carousel-item';
          }
          cardsWrapperTacos = document.createElement('div');
          cardsWrapperTacos.className = 'cards-wrapper';
          carouselItemTacos.appendChild(cardsWrapperTacos);
          carouselTacos.appendChild(carouselItemTacos);
          counterTacos = 0;
        }
        cardsWrapperTacos.innerHTML += createCard(product);
        counterTacos++;
      }
      if (product.category === 'quesadillas') {
        if (counterQuesadillas === 0 || counterQuesadillas === 4) {
          carouselItemQuesadillas = document.createElement('div');

          if (firstQuesadilla) {
            carouselItemQuesadillas.className = 'carousel-item active';
            firstQuesadilla = false;
          } else {
            carouselItemQuesadillas.className = 'carousel-item';
          }
          cardsWrapperQuesadillas = document.createElement('div');
          cardsWrapperQuesadillas.className = 'cards-wrapper';
          carouselItemQuesadillas.appendChild(cardsWrapperQuesadillas);
          carouselQuesadillas.appendChild(carouselItemQuesadillas);
          counterQuesadillas = 0;
        }
        cardsWrapperQuesadillas.innerHTML += createCard(product);
        counterQuesadillas++;
      }
      if (product.category === 'bebidas') {
        if (counterBebidas === 0 || counterBebidas === 4) {
          carouselItemBebidas = document.createElement('div');

          if (firstBebida) {
            carouselItemBebidas.className = 'carousel-item active';
            firstBebida = false;
          } else {
            carouselItemBebidas.className = 'carousel-item';
          }
          cardsWrapperBebidas = document.createElement('div');
          cardsWrapperBebidas.className = 'cards-wrapper';
          carouselItemBebidas.appendChild(cardsWrapperBebidas);
          carouselBebidas.appendChild(carouselItemBebidas);
          counterBebidas = 0;
        }
        cardsWrapperBebidas.innerHTML += createCard(product);
        counterBebidas++;
      }
    });
  }

  if (cardsWrapperTacos === '') {
    carouselTacos.parentElement.parentElement.innerHTML = `<p>No hay productos</p>`;
  }
  if (cardsWrapperQuesadillas === '') {
    carouselQuesadillas.parentElement.innerHTML = `<p>No hay productos</p>`;
  }
  if (cardsWrapperBebidas === '') {
    carouselBebidas.parentElement.innerHTML = `<p>No hay productos</p>`;
  }
};

const createCard = (product) => {
  return `
  <div class="card m-4" style="width: 18rem">
    <img
      src="${product.image}"
      class="card-img-top"
      alt="${product.name}"
      style="height: 200px"
    />
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <a href="editarProducto.html?${product.id_product}" class="btn btn-primary">Editar</a>
      <a onclick="deleteProduct(${product.id_product})" class="btn btn-danger">Eliminar</a>
    </div>
  </div>
  `;
};

const loadProducts = async () => {
  const products = await getProducts();
  renderProducts(products);
};

const deleteProduct = async (id) => {
  const response = await fetch(`http://127.0.0.1:3000/api/v1/products/${id}`, {
    method: 'DELETE',
  });

  if (response.status === 200) {
    loadProducts();
    return true;
  }
  return false;
};

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

  loadProducts();
};

init();
