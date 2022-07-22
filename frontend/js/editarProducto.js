// get id in url
const id = new URLSearchParams(window.location.search).get('id');
const productForm = document.getElementById('productForm');

const getProduct = async (id) => {
  const response = await fetch(`http://127.0.0.1:3000/api/v1/products/${id}`);
  const product = await response.json();
  return product;
};

productForm.addEventListener('submit', async (e) => {
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


  const response = await fetch(`http://127.0.0.1:3000/api/v1/products/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (response.status === 200) {
    window.location.href = 'panelAdmin.html';
    return;
  }

  alert('Error al editar el producto');
  window.location.href = 'panelAdmin';
  return
});

const init = async () => {
  const product = await getProduct(id);
  const { name, description, price, category } = product;
  productForm.name.value = name;
  productForm.description.value = description;
  productForm.price.value = price;
  productForm.category.value = category;
};

init();
