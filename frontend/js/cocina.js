const table = document.getElementById('table');

const getOrders = async () => {
  const response = await fetch(`http://127.0.0.1:3000/api/v1/orders/pending`);

  const data = await response.json();

  return data;
};

const createRow = (order) => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>

    </td>

    <td>
      <ul>
        <li>${order.id_order}</li>
      </ul>
    </td>

    <td>
      <button type="button" class="btn btn-primary btn-sm">
        Finalizar
      </button>
    </td>
  `;
  return row;
};

const renderOrders = async () => {
  const orders = await getOrders();

  orders.forEach((order) => {
    const row = createRow(order);
    table.appendChild(row);
  });
};

const init = async () => {
  renderOrders();
};

init();
