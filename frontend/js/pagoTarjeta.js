const id = new URLSearchParams(window.location.search).get('id_order');
const cancelarBtn = document.getElementById('cancelarBtn');
const tarjetaBtn = document.getElementById('tarjetaForm');

if (!id) {
  window.location.href = 'panelMesas.html';
}

cancelarBtn.setAttribute('href', `detalleOrden.html?id_order=${id}`);

tarjetaBtn.addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch(
    `http://127.0.0.1:3000/api/v1/orders/pay/${id}`,
    {
      method: 'POST',
    }
  );

  if (response.status === 200) {
    alert('Pago realizado');
    window.location.href = 'panelMesas.html';
    return
  }

  alert('Error al realizar el pago');
  return
});
