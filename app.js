// Cart functions - SINGLE PRODUCT CHECKOUT
function addToCart(productId) {
    const product = products[productId];
    
    // Clear existing cart (only one product at a time)
    cart = [];
    
    // Add single product with quantity 1
    cart.push({ ...product, quantity: 1 });
    
    saveCart();
    updateCartCount();
    showCheckout(); // Directly open checkout
}

function saveCart() {
    localStorage.setItem('mucoki_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.length > 0 ? 1 : 0;
    document.getElementById('cartCount').textContent = count;
}
