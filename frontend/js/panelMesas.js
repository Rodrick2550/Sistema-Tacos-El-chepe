const tableTBody = document.getElementById('tableTBody');
const odersContainer = document.getElementById('ordersContainer');
const user = JSON.parse(localStorage.getItem('user'));
const userId = user.id_usuario;

const getAvailableTables = async () => {
  const response = await fetch('http://localhost:3000/api/v1/tables');
  const data = await response.json();

  return data;
};

const getAssignedOrders = async () => {
  const response = await fetch(
    `http://localhost:3000/api/v1/orders?id_mesero=${userId}`
  );
  const data = await response.json();

  return data;
};

const createOrder = async (id) => {
  console.log(id);
  const response = await fetch('http://localhost:3000/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_table: id,
      id_mesero: userId,
    }),
  });

  if (!response.status === 201) {
    alert('Error al crear la orden, intente nuevamente');
    return;
  }

  window.location.href = 'panelMesas.html';
  return;
};

const createTableRow = (table) => {
  const tableRow = document.createElement('tr');
  const tableRowName = document.createElement('th');
  const tableRowButton = document.createElement('th');
  const tableRowButtonButton = document.createElement('a');
  tableRowButtonButton.setAttribute('class', 'btn btn-primary');
  tableRowButtonButton.setAttribute(
    'onclick',
    `createOrder(${table.id_table})`
  );

  tableRowName.innerHTML = table.name;
  tableRowButtonButton.innerHTML = 'Ocupar';

  tableRowButton.appendChild(tableRowButtonButton);
  tableRow.appendChild(tableRowName);
  tableRow.appendChild(tableRowButton);

  return tableRow;
};

const createOrderCard = (table) => {
  const orderCard = document.createElement('div');
  orderCard.setAttribute('class', 'card m-4');
  orderCard.setAttribute('style', 'width: 18rem;');

  const imgCard = document.createElement('img');
  imgCard.setAttribute('class', 'card-img-top');
  imgCard.setAttribute(
    'src',
    'https://ambit.com.mx/wp-content/uploads/2016/12/C%C3%B3mo-a%C3%B1adir-mesas-en-RestBar-en-8-sencillos-pasos-1.jpg'
  );
  imgCard.setAttribute('alt', table.name);

  const cardBody = document.createElement('div');
  cardBody.setAttribute('class', 'card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.setAttribute('class', 'card-title');
  cardTitle.innerHTML = table.name;

  const detailsButton = document.createElement('a');
  detailsButton.setAttribute('class', 'btn btn-primary');
  detailsButton.setAttribute('href', `detalleOrden.html?id_order=${table.id_order}`);
  detailsButton.innerHTML = 'Detalles';

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(detailsButton);
  orderCard.appendChild(imgCard);
  orderCard.appendChild(cardBody);

  return orderCard;
};

const renderAvailableTables = async () => {
  const tables = await getAvailableTables();

  tables.forEach((table) => {
    const tableRow = createTableRow(table);
    tableTBody.appendChild(tableRow);
  });
};

const renderAssignedOrders = async () => {
  const orders = await getAssignedOrders();

  orders.forEach((order) => {
    const orderRow = createOrderCard(order);
    odersContainer.appendChild(orderRow);
  });
};

const init = async () => {
  renderAvailableTables();
  renderAssignedOrders();
};

init();
