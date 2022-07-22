const pagarBtn = document.getElementById('pagarBtn');
const cancelarBtn = document.getElementById('cancelarBtn');
const id = new URLSearchParams(window.location.search).get('id_order');

if (!id) {
  window.location.href = 'panelMesas.html';
}

cancelarBtn.setAttribute('href', `panelMesas.html?id_order=${id}`);

pagarBtn.addEventListener('click', async (e) => {
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
    return;
  }

  alert('Error al realizar el pago');
  return;
});
