const id = new URLSearchParams(window.location.search).get('id_order');
const cancelarBtn = document.getElementById('cancelarBtn');
const tarjetaBtn = document.getElementById('tarjetaBtn');
const efectivoBtn = document.getElementById('efectivoBtn');

if (!id) {
  window.location.href = 'panelMesas.html';
}

cancelarBtn.setAttribute('href', `detalleOrden.html?id_order=${id}`);
tarjetaBtn.setAttribute('href', `pagoTarjeta.html?id_order=${id}`);
efectivoBtn.setAttribute('href', `pagoEfectivo.html?id_order=${id}`);