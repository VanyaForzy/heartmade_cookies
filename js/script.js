// ======= Дані продуктів =======
const PRODUCTS = [
  {id:1,name:"Овсяне печиво",price:45,desc:"Хрустке печиво з вівсянки та родзинками",img:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=60"},
  {id:2,name:"Шоколадне печиво",price:55,desc:"Інтенсивний шоколадний смак з шоколадними краплями",img:"https://images.unsplash.com/photo-1589710752476-9b2b5a0aa2d6?auto=format&fit=crop&w=800&q=60"},
  {id:3,name:"Лимонне печиво",price:50,desc:"Світле, ніжне печиво з цитрусовою ноткою",img:"https://images.unsplash.com/photo-1551024737-8f23befc3d5b?auto=format&fit=crop&w=800&q=60"},
  {id:4,name:"Мигдальне печиво",price:60,desc:"Аромат мигдалю та тонка текстура",img:"https://images.unsplash.com/photo-1601924928370-64f7a4d3f1f2?auto=format&fit=crop&w=800&q=60"},
  {id:5,name:"Імбирні пряники",price:48,desc:"Традиційні пряники з імбиром і корицею",img:"https://images.unsplash.com/photo-1603046892132-0b1f7d3d4f1a?auto=format&fit=crop&w=800&q=60"}
  
];

// ======= Ключ localStorage =======
const CART_KEY = 'cart';

// ======= Робота з кошиком =======
function getCart() { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); }

// ======= Додавання товару =======
function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(i => i.name === product.name);
  if (existing) existing.qty += 1;
  else cart.push({...product, qty:1});
  saveCart(cart);
}

// ======= Відображення кошика =======
function renderCart() {
  const container = document.getElementById("cart-container");
  if (!container) return;
  const cart = getCart();
  container.innerHTML = "";

  if(cart.length === 0) {
    container.innerHTML = "<p>Ваш кошик порожній 😢</p>";
    return;
  }

  cart.forEach((item,index)=>{
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>${item.price} грн × <input type="number" min="1" value="${item.qty}" data-index="${index}" class="qty-input" style="width:60px"></p>
      </div>
      <button class="remove-btn" data-index="${index}">×</button>
    `;
    container.appendChild(div);
  });

  // Видалення
  document.querySelectorAll(".remove-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const idx = btn.dataset.index;
      const cart = getCart();
      cart.splice(idx,1);
      saveCart(cart);
      renderCart();
    });
  });

  // Зміна кількості
  document.querySelectorAll(".qty-input").forEach(input=>{
    input.addEventListener("input",()=>{
      let qty = parseInt(input.value);
      if(qty<=0) qty=1;
      const cart = getCart();
      cart[input.dataset.index].qty = qty;
      saveCart(cart);
      renderCart();
    });
  });
}

// ======= Очищення кошика =======
const clearBtn = document.getElementById("clear-cart");
if(clearBtn){
  clearBtn.addEventListener("click",()=>{
    localStorage.removeItem(CART_KEY);
    renderCart();
  });
}

// ======= Лічильник товарів =======
function updateCartCount(){
  const countEls = document.querySelectorAll("#cart-count, #cart-count-2");
  const total = getCart().reduce((s,i)=>s+i.qty,0);
  countEls.forEach(el=>el.textContent=total);
}

// ======= Створення картки продукту =======
function createProductCard(p){
  const div = document.createElement("div");
  div.className = "catalog-item";
  div.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p class="price">${p.price}</p>
    <p class="details-text">${p.desc}</p>
    <button class="details-btn">Детальніше</button>
    <button class="add-to-cart">Додати у кошик</button>
  `;}
 
  
// Чекаємо, поки сторінка завантажиться
document.addEventListener("DOMContentLoaded", () => {

  // ================== Функції для кошика ==================

  // Отримати кошик з localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Зберегти кошик у localStorage
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  // Додати товар у кошик
  function addToCart(product) {
    const cart = getCart();
    // Перевірка, чи вже є такий товар
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
      existing.qty++;
    } else {
      product.qty = 1;
      cart.push(product);
    }
    saveCart(cart);
    alert("Додано в кошик!");
  }

  // Видалити товар за індексом
  function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
  }

  // Змінити кількість товару
  function changeQty(index, qty) {
    const cart = getCart();
    if (qty <= 0) {
      removeFromCart(index);
    } else {
      cart[index].qty = qty;
      saveCart(cart);
    }
  }

  // ================== Рендер кошика ==================
  function renderCart() {
    const container = document.getElementById("cart-container");
    if (!container) return;

    const cart = getCart();
    container.innerHTML = "";

    if (cart.length === 0) {
      container.innerHTML = "<p>Ваш кошик порожній 😢</p>";
      return;
    }

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>${item.price} грн</p>
          <input type="number" min="1" value="${item.qty}" data-index="${index}" class="qty-input">
        </div>
        <button class="remove-btn" data-index="${index}">×</button>
      `;
      container.appendChild(div);
    });

    // Прив’язка видалення
    container.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        removeFromCart(Number(btn.dataset.index));
      });
    });

    // Прив’язка зміни кількості
    container.querySelectorAll(".qty-input").forEach(input => {
      input.addEventListener("input", () => {
        const idx = Number(input.dataset.index);
        const qty = Number(input.value) || 1;
        changeQty(idx, qty);
      });
    });
  }

  // Кнопка очистити кошик
  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      renderCart();
    });
  }

  // ================== Кнопки "Додати у кошик" ==================
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".catalog-item");
      const name = item.querySelector("h3").textContent;
      const price = parseFloat(item.querySelector(".price").textContent);
      const img = item.querySelector("img").src;

      addToCart({ name, price, img });
    });
  });

  // ================== Детальніше ==================
  document.querySelectorAll(".details-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.nextElementSibling;
      text.classList.toggle("show");
    });
  });

  // Рендер кошика при завантаженні
  renderCart();
});

// ======= Відображення каталогу =======
function renderCatalog(targetId,filter=''){
  const grid = document.getElementById(targetId);
  if(!grid) return;
  grid.innerHTML = "";
  const items = PRODUCTS.filter(p=>p.name.toLowerCase().includes(filter.toLowerCase()));
  items.forEach(p=>grid.appendChild(createProductCard(p)));
}

// ======= Попередній перегляд на головній =======
function renderHomepagePreview(){
  const el = document.getElementById('homepage-products');
  if(!el) return;
  el.innerHTML='';
  PRODUCTS.slice(0,3).forEach(p=>el.appendChild(createProductCard(p)));
}

// ======= DOMContentLoaded =======
document.addEventListener("DOMContentLoaded",()=>{
  renderHomepagePreview();
  renderCatalog('products-grid');
  renderCart();
  updateCartCount();

  // Пошук по каталогу
  const search = document.getElementById("search");
  if(search){
    search.addEventListener("input",e=>{
      renderCatalog('products-grid',e.target.value);
    });
  }

  // Форма замовлення
  const orderForm = document.getElementById("order-form");
  if(orderForm){
    orderForm.addEventListener("submit",e=>{
      e.preventDefault();
      const data = new FormData(orderForm);
      const name = data.get('name');
      const phone = data.get('phone');
      const address = data.get('address') || 'Самовивіз';
      const cart = getCart();
      if(cart.length===0){
        document.getElementById("order-result").textContent='Кошик порожній — додайте товари перед оформленням.';
        return;
      }
      const total = cart.reduce((s,i)=>s+i.qty*i.price,0);
      document.getElementById("order-result").innerHTML = `<strong>Дякуємо, ${name}!</strong> Ми отримали ваше замовлення на ${total} грн. Зв'яжемося за телефоном ${phone}.`;
      localStorage.removeItem(CART_KEY);
      renderCart();
      updateCartCount();
      orderForm.reset();
    });
  }

  // Форма контакту
  const messageForm = document.getElementById("messageForm");
  const status = document.getElementById("formStatus");
  if(messageForm){
    messageForm.addEventListener("submit",e=>{
      e.preventDefault();
      status.textContent="Дякуємо! Ваше повідомлення надіслано 💛";
      messageForm.reset();
    });
  }

});

const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const cart = getCart();
    if (cart.length === 0) {
      alert("Ваш кошик порожній! Додайте товари перед оформленням.");
      return;
    }
    // Зберігаємо кошик для сторінки замовлення
    localStorage.setItem("checkout_cart", JSON.stringify(cart));
    window.location.href = "order.html"; // переходимо на сторінку замовлення
  });
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('details-btn')) {
    const item = e.target.closest('.catalog-item');
    const text = item.querySelector('.details-text');
    text.classList.toggle('show');
  }
});






const modal = document.getElementById("heartbox-modal");
const openHB = document.querySelector(".heartbox-btn");
const closeModal = document.querySelector(".close-modal");
const modalList = document.getElementById("modal-cookie-list");
const confirmHB = document.getElementById("confirm-heartbox");
const countText = document.getElementById("selected-count");

let selected = [];

openHB.addEventListener("click", () => {
  modal.style.display = "flex";
  generateCookiesList();
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  resetSelection();
});

function generateCookiesList() {
  modalList.innerHTML = "";

  const items = document.querySelectorAll(".catalog-item");

  items.forEach(item => {
    const name = item.querySelector("h3").innerText;
    const imgSrc = item.querySelector("img").src;

    if (name !== "HeartBox (4 шт)") {
      const box = document.createElement("div");
      box.classList.add("modal-cookie");

      box.innerHTML = `
        <img src="${imgSrc}" alt="${name}">
        <p>${name}</p>
      `;

      box.addEventListener("click", () => {
        if (box.classList.contains("selected")) {
          box.classList.remove("selected");
          selected = selected.filter(n => n !== name);
        } else {
          if (selected.length < 4) {
            box.classList.add("selected");
            selected.push(name);
          }
        }
        countText.innerText = selected.length;
        confirmHB.disabled = selected.length !== 4;
      });

      modalList.appendChild(box);
    }
  });
}



function resetSelection() {
  selected = [];
  countText.innerText = 0;
  confirmHB.disabled = true;
}

confirmHB.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({
    name: "HeartBox",
    price: 220,
    img: "images/box.jpg",
    cookies: selected,   // <-- Оце головне, твій масив selected!
    qty: 1               // <-- відповідно твоїй логіці qty
});
    
 

  

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("HeartBox додано у кошик! ❤️");

  modal.style.display = "none";
  resetSelection();
});


document.addEventListener("DOMContentLoaded", () => {

  const cart = JSON.parse(localStorage.getItem("checkout_cart")) || [];
  const form = document.getElementById("order-form");
  const cartField = document.getElementById("cart-data");

  if (!form) return;

  form.addEventListener("submit", () => {

    let output = "";

    cart.forEach(item => {

      // === Якщо це HeartBox ===
      if (item.name === "HeartBox" && Array.isArray(item.items)) {
        output += `HeartBox (4 шт)\n`;
        output += `Склад: ${item.items.join(", ")}\n`;
        output += `Ціна: ${item.price} грн × ${item.qty}\n\n`;
      }

      // === Якщо звичайне печиво ===
      else {
        output += `${item.name} — ${item.qty} шт × ${item.price} грн = ${item.qty * item.price} грн\n`;
      }

    });

    // Підрахунок суми
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    output += `\nЗагальна сума: ${total} грн`;

    // Записуємо в приховане поле форми
    cartField.value = output;

    // Очистити кошики
    setTimeout(() => {
      localStorage.removeItem("cart");
      localStorage.removeItem("checkout_cart");
    }, 300);
  });

});




