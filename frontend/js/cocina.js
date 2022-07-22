const bodyTodo = document.getElementById('bodyTodo');
const bodyInProgress = document.getElementById('bodyInProgress');

const getOrders = async () => {
  const response = await fetch(`http://127.0.0.1:3000/api/v1/order-items`);

  const data = await response.json();

  return data;
};

const updateOrderItem = async (id, status) => {
  console.log(status)
  const response = await fetch(
    `http://127.0.0.1:3000/api/v1/order-items/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: status,
      }),
    }
  );

  if (!response.status === 200) {
    alert('Error al actualizar el estado de la orden, intente nuevamente');
    return;
  }

  bodyTodo.innerHTML = '';
  bodyInProgress.innerHTML = '';
  renderOrders();
  return;
};

const createRow = (orderItem, status) => {
  const row = document.createElement('tr');

  const quantity = document.createElement('td');
  quantity.innerHTML = orderItem.quantity;

  const product = document.createElement('td');
  product.innerHTML = orderItem.product_name;

  const button = document.createElement('td');
  const buttonElement = document.createElement('button');
  buttonElement.setAttribute('class', 'btn btn-primary');

  if (status === 'todo') {
    buttonElement.innerHTML = 'Empezar';
    buttonElement.setAttribute(
      'onclick',
      `updateOrderItem(${orderItem.id_order_item}, 'in progress')`
    );
  } else {
    buttonElement.innerHTML = 'Terminado';
    buttonElement.setAttribute(
      'onclick',
      `updateOrderItem(${orderItem.id_order_item}, 'done')`
    );
  }

  button.appendChild(buttonElement);

  row.appendChild(quantity);
  row.appendChild(product);
  row.appendChild(button);

  return row;
};

const renderOrders = async () => {
  const orders = await getOrders();

  console.log(orders);

  orders.forEach((order) => {
    if (order.status === 'todo') {
      const row = createRow(order, 'todo');
      bodyTodo.appendChild(row);
    }
    if (order.status === 'in progress') {
      const row = createRow(order, 'in progress');
      bodyInProgress.appendChild(row);
    }
  });
};

const init = async () => {
  renderOrders();
};

init();
