const id = new URLSearchParams(window.location.search).get('id_order');
const rowsContainer = document.getElementById('rowsContainer');
const registroBtn = document.getElementById('regresarBtn');
const totalText = document.getElementById('totalText');
let total = 0;

if (!id) {
  window.location.href = 'panelMesas.html';
}

const getOrderItems = async () => {
  const response = await fetch(
    `http://127.0.0.1:3000/api/v1/order-items?id_order=${id}`
  );

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }

  return;
};

const createOrderItemRow = (orderItem) => {
  const row = document.createElement('tr');

  const productName = document.createElement('th');
  const productQuantity = document.createElement('th');

  productName.innerHTML = orderItem.product_name;
  productQuantity.innerHTML = orderItem.quantity;

  row.appendChild(productName);
  row.appendChild(productQuantity);

  return row;
};

const renderOrderItems = (orderItems) => {
  orderItems.map((orderItem) => {
    total += parseInt(orderItem.total);
    rowsContainer.appendChild(createOrderItemRow(orderItem));
  });
};

const init = async () => {
  registroBtn.setAttribute('href', `detalleOrden.html?id_order=${id}`);
  const orderItems = await getOrderItems();
  renderOrderItems(orderItems);
  totalText.innerHTML = `Total: ${total}`;
};

init();
