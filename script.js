const productImages = [
    {id: 1,  name:"Toner",                       price:280, oldPrice:350, discount:20, rating:4.8, reviews:129, image:"images/Balancing Facial Toner.jpg",    description:"A gentle toner that balances your skin's pH and preps it for the next step in your routine."},
    {id: 2,  name:"Eye Contour",                 price:310, rating:4.5, reviews:80,  image:"images/Eye Contour Cream.jpg",         description:"Lightweight cream that reduces puffiness and dark circles around the eyes."},
    {id: 3,  name:"Face Mist Serum",             price:420, rating:4.7, reviews:64,  image:"images/Face Mist Serum.jpg",           description:"A refreshing mist infused with active serum ingredients for instant hydration."},
    {id: 4,  name:"Gentle Facial Cleanser",      price:170, oldPrice:210, discount:20, rating:4.4, reviews:90,  image:"images/Gentle Facial Cleanser.jpg",    description:"Removes dirt and makeup without stripping your skin's natural moisture."},
    {id: 5,  name:"Hyaluronic Acid",             price:185, rating:4.6, reviews:112, image:"images/Hyaluronic Acid.jpg",           description:"Deeply hydrating serum that plumps and smooths the skin."},
    {id: 6,  name:"Hydrating Day Cream",         price:240, rating:4.3, reviews:75,  image:"images/Hydrating Day Cream.jpg",       description:"Lightweight daily moisturizer for soft, hydrated skin all day long."},
    {id: 7,  name:"Luxury Face Oil",             price:230, rating:4.9, reviews:58,  image:"images/Luxury Face Oil.jpg",           description:"A nourishing blend of oils that restores radiance and softness."},
    {id: 8,  name:"Midnight Repair Serum",       price:450, rating:4.7, reviews:99,  image:"images/Midnight Repair Serum.jpg",     description:"Overnight serum that repairs and renews your skin while you sleep."},
    {id: 9,  name:"Niacinamide",                 price:335, oldPrice:390, discount:20, rating:5,   reviews:150, image:"images/Niacinamide.jpg",               description:"Minimizes pores and evens out skin tone for a smoother complexion."},
    {id: 10, name:"Nourishing Overnight Mask",   price:390, rating:4.5, reviews:70,  image:"images/Nourishing Overnight Mask.jpg", description:"A rich overnight mask that deeply nourishes tired skin."},
    {id: 11, name:"Refreshing Water Gel",        price:180, rating:4.4, reviews:66,  image:"images/Refreshing Water Gel.jpg",      description:"Lightweight gel moisturizer that hydrates without feeling heavy."},
    {id: 12, name:"Rich Night Recovery Cream",   price:590, oldPrice:700, discount:20, rating:4.1, reviews:129, image:"images/Rich Night Recovery Cream.jpg", description:"Intensive night cream that supports skin renewal and repair."},
    {id: 13, name:"Scrub",                       price:90,  rating:4.2, reviews:54,  image:"images/Scrub.jpg",                     description:"Exfoliating scrub that removes dead skin cells for a smoother texture."},
    {id: 14, name:"Sunscreen SPF 50",            price:215, rating:4.8, reviews:140, image:"images/Sunscreen SPF 50.jpg",          description:"Broad spectrum protection that shields your skin from sun damage."},
    {id: 15, name:"Vitamin C",                   price:315, rating:4.9, reviews:160, image:"images/Vitamin C.jpg",                 description:"Brightening serum that fades dark spots and boosts glow."}
];

const categoryMap = {
    1:"cleansers", 2:"creams", 3:"serums", 4:"cleansers", 5:"serums",
    6:"creams", 7:"serums", 8:"serums", 9:"serums", 10:"creams",
    11:"creams", 12:"creams", 13:"cleansers", 14:"cleansers", 15:"serums"
};



productImages.forEach(p => p.category = categoryMap[p.id]);


let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

function addToCart(product, qty) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: qty });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) cartCountEl.textContent = totalQty;
}

let currentCategory = 'all';
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');

function applyCombinedFilters() {
    if (!priceRange) return;
    const maxPrice = Number(priceRange.value);
    let filtered = productImages.filter(p => p.price <= maxPrice);

    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    renderProducts(filtered);
}

document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentCategory = item.dataset.category;
        applyCombinedFilters();
    });
});

if (priceRange && priceValue) {
    priceRange.addEventListener('input', () => {
        priceValue.textContent = `$${priceRange.value}`;
    });
}

const applyFiltersBtn = document.getElementById('applyFilters');
if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', applyCombinedFilters);
}


function renderProducts(products){
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    if (products.length === 0) {
        grid.innerHTML = '<p>No products match these filters</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-box">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <p class="product-name">${product.name}</p>
            <div class="rating-row">
                <i class="fa-solid fa-star"></i>
                <span class="rating-num">${product.rating || 0}</span>
                <span class="rating-count">(${product.reviews || 0} reviews)</span>
            </div>
            <div class="price-row">
                <div class="price-left">
                    <span class="price-now">$${product.price}</span>
                    ${product.oldPrice ? `<span class="price-old">$${product.oldPrice}</span>` : ''}
                    ${product.discount ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
                </div>
                <span class="delivery-note"><i class="fa-solid fa-truck"></i> Free delivery</span>
            </div>
            <div class="cart-controls">
                <div class="qty-selector">
                    <button class="qty-btn minus">-</button>
                    <span class="qty-value">1</span>
                    <button class="qty-btn plus">+</button>
                </div>
                <button class="cart-btn"><i class="fa-solid fa-cart-shopping"></i></button>
            </div>
        `;

        card.querySelector('img').addEventListener('click', () => showProductDetails(product));
        card.querySelector('.product-name').addEventListener('click', () => showProductDetails(product));

        const qtyValue = card.querySelector('.qty-value');
        card.querySelector('.plus').addEventListener('click', () => {
            qtyValue.textContent = Number(qtyValue.textContent) + 1;
        });
        card.querySelector('.minus').addEventListener('click', () => {
            if (Number(qtyValue.textContent) > 1) {
                qtyValue.textContent = Number(qtyValue.textContent) - 1;
            }
        });

        card.querySelector('.cart-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product, Number(qtyValue.textContent));
        });

        grid.appendChild(card);
    });
}


function showProductDetails(product){
    const modalImage = document.getElementById('modalImage');
    if (!modalImage) return;

    modalImage.src = product.image;
    document.getElementById('modalName').textContent = product.name;
    document.getElementById('modalPrice').textContent = `$${product.price}`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalQty').textContent = '1';
    document.getElementById('productModal').style.display = 'flex';

    const modalAddBtn = document.getElementById('modalAddToCart');
    const newBtn = modalAddBtn.cloneNode(true);
    modalAddBtn.parentNode.replaceChild(newBtn, modalAddBtn);

    newBtn.addEventListener('click', () => {
        const qty = Number(document.getElementById('modalQty').textContent);
        addToCart(product, qty);
        document.getElementById('productModal').style.display = 'none';
    });
}

const modalPlusBtn = document.getElementById('modalPlus');
if (modalPlusBtn) {
    modalPlusBtn.addEventListener('click', () => {
        const qtyEl = document.getElementById('modalQty');
        qtyEl.textContent = Number(qtyEl.textContent) + 1;
    });
}

const modalMinusBtn = document.getElementById('modalMinus');
if (modalMinusBtn) {
    modalMinusBtn.addEventListener('click', () => {
        const qtyEl = document.getElementById('modalQty');
        if (Number(qtyEl.textContent) > 1) {
            qtyEl.textContent = Number(qtyEl.textContent) - 1;
        }
    });
}

const closeModalBtn = document.getElementById('closeModal');
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        document.getElementById('productModal').style.display = 'none';
    });
}

const productModalEl = document.getElementById('productModal');
if (productModalEl) {
    productModalEl.addEventListener('click', (e) => {
        if (e.target.id === 'productModal') {
            productModalEl.style.display = 'none';
        }
    });
}

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        header.parentElement.classList.toggle('open');
    });
});


const cartIconWrapper = document.querySelector('.cart-icon-wrapper');
if (cartIconWrapper) {
    cartIconWrapper.addEventListener('click', () => {
        document.getElementById('cartMainView').style.display = 'block';
        document.getElementById('cartSuccessView').style.display = 'none';
        renderCartModal();
        document.getElementById('cartModal').style.display = 'flex';
    });
}

function renderCartModal() {
    const list = document.getElementById('cartItemsList');
    if (!list) return;

    list.innerHTML = '';

    const confirmBtn = document.getElementById('confirmOrder');

    if (cart.length === 0) {
        list.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        if (confirmBtn) confirmBtn.disabled = true;
    } else {
        if (confirmBtn) confirmBtn.disabled = false;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <p>${item.name}</p>
                <span>Qty: ${item.qty}</span>
            </div>
            <span class="cart-item-price">$${item.price * item.qty}</span>
        `;
        list.appendChild(row);
    });

    document.getElementById('cartTotal').textContent = `$${total}`;
}

const closeCartBtn = document.getElementById('closeCart');
if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
        document.getElementById('cartModal').style.display = 'none';
    });
}

const continueShoppingBtn = document.getElementById('continueShopping');
if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
        document.getElementById('cartModal').style.display = 'none';
    });
}

const confirmOrderBtn = document.getElementById('confirmOrder');
if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

        document.getElementById('cartMainView').style.display = 'none';
        document.getElementById('cartSuccessView').style.display = 'block';
    });
}

const closeSuccessBtn = document.getElementById('closeSuccessBtn');
if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
        document.getElementById('cartModal').style.display = 'none';
    });
}

renderProducts(productImages);


const personIcon = document.querySelector('.fa-person');
if (personIcon) {
    personIcon.addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }

        renderAccountModal();
        document.getElementById('accountModal').style.display = 'flex';
    });
}

function renderAccountModal() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    document.getElementById('accName').textContent = currentUser.fullName;
    document.getElementById('accEmail').textContent = currentUser.email;

    const addressSection = document.getElementById('addressSection');

    if (currentUser.address) {
        addressSection.innerHTML = `
            <p><strong>Address:</strong> ${currentUser.address}</p>
            <button id="editAddressBtn" class="link-btn">Edit address</button>
        `;
        document.getElementById('editAddressBtn').addEventListener('click', showAddressInput);
    } else {
        showAddressInput();
    }
}

function showAddressInput() {
    const addressSection = document.getElementById('addressSection');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    addressSection.innerHTML = `
        <label for="accAddress">Address</label>
        <input type="text" id="accAddress" placeholder="Enter your address" value="${currentUser.address || ''}">
        <button id="saveAddressBtn">Save</button>
    `;

    document.getElementById('saveAddressBtn').addEventListener('click', () => {
        const newAddress = document.getElementById('accAddress').value.trim();
        if (!newAddress) return;

        let user = JSON.parse(localStorage.getItem('currentUser'));
        user.address = newAddress;
        localStorage.setItem('currentUser', JSON.stringify(user));

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const index = users.findIndex(u => u.email === user.email);
        if (index !== -1) {
            users[index] = user;
            localStorage.setItem('users', JSON.stringify(users));
        }

        renderAccountModal();
    });
}

const closeAccountBtn = document.getElementById('closeAccount');
if (closeAccountBtn) {
    closeAccountBtn.addEventListener('click', () => {
        document.getElementById('accountModal').style.display = 'none';
    });
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
}





document.getElementById('shopp').addEventListener('click', () => {
    window.location.href = 'shop.html';
});