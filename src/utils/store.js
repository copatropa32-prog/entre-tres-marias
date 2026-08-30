// Gerenciador global de Carrinho e Favoritos
export const getCart = () => JSON.parse(localStorage.getItem('entre_ave_marias_cart')) || [];
export const saveCart = (cart) => {
  localStorage.setItem('entre_ave_marias_cart', JSON.stringify(cart));
  updateCounters();
};

export const getFavorites = () => JSON.parse(localStorage.getItem('entre_ave_marias_fav')) || [];
export const saveFavorites = (favs) => {
  localStorage.setItem('entre_ave_marias_fav', JSON.stringify(favs));
};

export function addToCart(product) {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += (product.quantity || 1);
  } else {
    cart.push({ ...product, quantity: product.quantity || 1 });
  }
  saveCart(cart);
  openCartDrawer();
}

export function updateCounters() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-count-num').forEach(el => {
    el.textContent = totalItems;
  });
}

export function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.add('open');
  renderCartItems();
}

export function openFavoritesDrawer() {
  const drawer = document.getElementById('favorites-drawer');
  if (drawer) drawer.classList.add('open');
  renderFavoriteItems();
}

// Renderizadores básicos das gavetas
function renderCartItems() {
  const container = document.getElementById('cart-items-container');
  const totalContainer = document.getElementById('cart-subtotal');
  if (!container) return;

  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-msg">Seu carrinho está vazio.</p>`;
    if (totalContainer) totalContainer.textContent = 'R$ 0,00';
    return;
  }

  let subtotal = 0;
  container.innerHTML = cart.map(item => {
    subtotal += item.price * item.quantity;
    return `
      <div class="drawer-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="drawer-item-info">
          <h4>${item.name}</h4>
          <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
        <button onclick="window.removeItemCart('${item.id}')" class="remove-btn">&times;</button>
      </div>
    `;
  }).join('');

  if (totalContainer) totalContainer.textContent = `R$ ${subtotal.toFixed(2)}`;
}

window.removeItemCart = (id) => {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCartItems();
};

document.addEventListener('DOMContentLoaded', () => {
  updateCounters();

  // Eventos para abrir as gavetas pelos botões do Header que criamos antes
  document.getElementById('open-cart-desktop')?.addEventListener('click', openCartDrawer);
  document.getElementById('open-cart-mobile')?.addEventListener('click', openCartDrawer);
  document.getElementById('open-cart-mobile-menu')?.addEventListener('click', openCartDrawer);
  
  document.getElementById('open-favorites-desktop')?.addEventListener('click', openFavoritesDrawer);
  document.getElementById('open-favorites-mobile-menu')?.addEventListener('click', openFavoritesDrawer);
});