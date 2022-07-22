const carouselTacos = document.getElementById('carouselTacosInner');
const carouselQuesadillas = document.getElementById('carouselQuesadillasInner');
const carouselBebidas = document.getElementById('carouselBebidasInner');
const registroPedidosLink = document.getElementById('registroPedidosLink');
const cuentaLink = document.getElementById('cuentaLink');
const id = new URLSearchParams(window.location.search).get('id_order');

if (!id) {
  window.location.href = 'panelMesas.html';
}

const addProductToOrder = async (productId, quantity) => {
  const response = await fetch(`http://127.0.0.1:3000/api/v1/order-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_order: id,
      id_product: productId,
      quantity: quantity,
    }),
  });

  if (response.status === 200) {
    alert('Producto agregado');
    return;
  }

  alert('Error al agregar producto');
  return;
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
    carouselTacos.parentElement.innerHTML = `<p>No hay productos</p>`;
  }
  if (cardsWrapperQuesadillas === '') {
    carouselQuesadillas.parentElement.innerHTML = `<p>No hay productos</p>`;
  }
  if (cardsWrapperBebidas === '') {
    carouselBebidas.parentElement.innerHTML = `<p>No hay productos</p>`;
  }
};

const createCard = (product) => {
  // create card
  const card = document.createElement('div');
  card.className = 'card m-4';
  card.style.width = '18rem';

  // create img
  const img = document.createElement('img');
  img.className = 'card-img-top';
  img.src = product.image;
  img.alt = product.name;
  img.style.height = '200px';

  // create card-body
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  // create card-title
  const cardTitle = document.createElement('h5');
  cardTitle.className = 'card-title';
  cardTitle.innerHTML = product.name;

  // create cart-text
  const cardText = document.createElement('p');
  cardText.className = 'card-text';
  cardText.innerHTML = `Precio: ${product.price}`;

  // create card-text
  const cardForm = document.createElement('form');
  cardForm.className = 'formCard';
  cardForm.setAttribute('id_product', product.id_product);

  const labelQuantity = document.createElement('label');
  labelQuantity.innerHTML = 'Cantidad';
  labelQuantity.className = 'form-label';
  labelQuantity.htmlFor = `quantity-${product.id_product}`;

  const inputQuantity = document.createElement('input');
  inputQuantity.type = 'number';
  inputQuantity.className = 'form-control';
  inputQuantity.id = `quantity-${product.id_product}`;
  inputQuantity.min = '1';
  inputQuantity.required = true;

  const buttonAdd = document.createElement('button');
  buttonAdd.className = 'btn btn-primary mt-2';
  buttonAdd.innerHTML = 'Agregar';

  cardForm.appendChild(labelQuantity);
  cardForm.appendChild(inputQuantity);
  cardForm.appendChild(buttonAdd);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardForm);
  card.appendChild(img);
  card.appendChild(cardBody);

  return card.outerHTML;
};

const loadProducts = async () => {
  const products = await getProducts();
  carouselTacos.innerHTML = '';
  carouselQuesadillas.innerHTML = '';
  carouselBebidas.innerHTML = '';
  renderProducts(products);
};

const init = async () => {
  registroPedidosLink.setAttribute('href', `registroPedidos.html?id_order=${id}`);
  cuentaLink.setAttribute('href', `seleccionarMetodoPago.html?id_order=${id}`);

  await loadProducts();

  const formCards = document.querySelectorAll('.formCard');
  formCards.forEach((formCard) => {
    formCard.addEventListener('submit', async (e) => {
      e.preventDefault();
      const productId = e.target.getAttribute('id_product');
      const quantity = e.target.querySelector('input').value;
      await addProductToOrder(productId, quantity);
      formCard.reset();
    });
  });
};

init();
