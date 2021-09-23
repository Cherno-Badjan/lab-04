const form = document.getElementById('order');
const ul = document.getElementById('orders');

const appendOrder = (order) => {
  const li = document.createElement('li');
  li.textContent = `id: ${order.id} quantity: ${order.quantity} shoes`;
  ul.appendChild(li);
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const fd = new FormData(form);

  fetch('/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     quantity: fd.get('quantity')
    }),
  })
    .then((res) => res.json())
    .then(appendOrder);
});

fetch('/api/v1/orders')
  .then((res) => res.json())
  .then((orders) => {
    orders.forEach(appendOrder);
  });