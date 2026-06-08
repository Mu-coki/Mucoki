// Product Data with Cloudinary Images
const products = [
    {
        id: 1,
        name: "Diamond Pendant Necklace",
        category: "Necklace",
        price: 3250.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780834872/1000011762_hylaws.jpg",
        emoji: "💎",
        description: "Exquisite pure 22K gold necklace adorned with brilliant diamonds.",
    },
    {
        id: 2,
        name: "Ruby Engagement Ring",
        category: "Ring",
        price: 3280.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780846361/IMG-20260607-WA0129_dvoxg5.jpg",
        emoji: "💍",
        description: "Stunning pure 22K gold ring featuring a premium ruby stone.",
    },
    {
        id: 3,
        name: "Emerald Bracelet",
        category: "Bracelet",
        price: 3290.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780847344/IMG-20260607-WA0126_qmo7vv.jpg",
        emoji: "💚",
        description: "Elegant pure 22K gold bracelet with luxurious emerald stones.",
    },
    {
        id: 4,
        name: "Sapphire Earrings",
        category: "Earrings",
        price: 3400.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780848298/IMG-20260607-WA0113_nhf3da.jpg",
        emoji: "💙",
        description: "Radiant pure 22K gold earrings featuring deep blue sapphires.",
    },
    {
        id: 5,
        name: "Pearl Choker Set",
        category: "Choker Set",
        price: 3500.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780848623/IMG-20260607-WA0096_jb2ne9.jpg",
        emoji: "🤍",
        description: "Luxurious pure 22K gold choker with authentic pearls.",
    },
    {
        id: 6,
        name: "Golden Locket",
        category: "Locket",
        price: 3600.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780849519/IMG-20260607-WA0147_qpyojf.jpg",
        emoji: "🔓",
        description: "Precious pure 22K gold locket perfect for keeping memories.",
    },
    {
        id: 7,
        name: "Kundan Tiara",
        category: "Tiara",
        price: 3700.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780849481/IMG-20260607-WA0142_nobrbv.jpg",
        emoji: "👑",
        description: "Spectacular pure 22K gold tiara adorned with kundan stones.",
    },
    {
        id: 8,
        name: "Antique Brooch",
        category: "Brooch",
        price: 3750.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780834872/1000011762_hylaws.jpg",
        emoji: "📌",
        description: "Magnificent pure 22K gold brooch with antique finishing.",
    }
];

// Render Products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center;">
            </div>
            <div class="product-content">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-specs">
                    <p><span class="spec-highlight">Weight:</span> ${product.weight}</p>
                    <p><span class="spec-highlight">Material:</span> ${product.material}</p>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Update product image
function updateProductImage(productId, imageUrl) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.image = imageUrl;
        renderProducts();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', renderProducts);
